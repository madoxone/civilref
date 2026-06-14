-- ============================================================================
--  CivilRef.ca — Database Schema
--  Run this in the Supabase SQL Editor (Database → SQL Editor → New query).
--  It creates every table, relationship, and security rule the platform needs.
--  Safe to run once on a fresh project. Read the comments — they explain each part.
-- ============================================================================

-- ----------------------------------------------------------------------------
--  EXTENSIONS
--  pgcrypto gives us gen_random_uuid() for generating unique IDs.
-- ----------------------------------------------------------------------------
create extension if not exists pgcrypto;


-- ============================================================================
--  1. PROFILES  — one row per registered user (extends Supabase auth.users)
--  Every engineer/admin who signs up gets a profile. Their credential info and
--  role live here. The role column is what controls who can verify data.
-- ============================================================================
create table if not exists profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  email           text,
  role            text not null default 'engineer'
                    check (role in ('engineer','verifier','admin')),
  -- Professional credential details (for engineers/verifiers)
  credential_body text,          -- e.g. 'PEO', 'APEGA', 'EGBC', 'OIQ'
  credential_no   text,          -- e.g. '87234'
  province        text,          -- e.g. 'Ontario'
  specialty       text,          -- e.g. 'Municipal Utilities'
  bio             text,
  -- Has an admin confirmed this person really holds the credential they claim?
  credential_verified boolean not null default false,
  created_at      timestamptz not null default now()
);

comment on table profiles is 'User accounts. role: engineer (can submit), verifier (can approve), admin (full control).';


-- ============================================================================
--  2. DISCIPLINES & TOPICS  — the navigation backbone
--  disciplines = Utilities, Traffic, Structural, Civil, Construction
--  topics = the subtype under each (watermain, sanitary, concrete, etc.)
-- ============================================================================
create table if not exists disciplines (
  id          text primary key,        -- 'utilities', 'traffic', ...
  label       text not null,           -- 'Utilities'
  icon        text,                    -- '⬡'
  color       text,                    -- hex colour
  description text,
  sort_order  int not null default 0
);

create table if not exists topics (
  id            text primary key,      -- 'watermain', 'sanitary', ...
  discipline_id text not null references disciplines(id) on delete cascade,
  title         text not null,         -- 'Watermain — Potable Water Design'
  learn_intro   text,                  -- the plain-language Learn-path paragraph
  diagram_key   text,                  -- which isometric diagram to show
  sort_order    int not null default 0
);

create index if not exists idx_topics_discipline on topics(discipline_id);


-- ============================================================================
--  3. MUNICIPALITIES  — the list of cities + their province
-- ============================================================================
create table if not exists municipalities (
  id          text primary key,        -- 'toronto-on'
  name        text not null,           -- 'Toronto, ON'
  province    text not null,           -- 'ON'
  is_verified boolean not null default false,  -- has real data been confirmed?
  created_at  timestamptz not null default now()
);


-- ============================================================================
--  4. CODES  — Canadian codes & standards, per topic
--  This is the heart of the verification system. Every code carries its
--  provenance: who submitted it, who verified it, its source, and status.
-- ============================================================================
create table if not exists codes (
  id            uuid primary key default gen_random_uuid(),
  topic_id      text not null references topics(id) on delete cascade,
  code          text not null,         -- 'CSA B182.2'
  full_name     text not null,         -- 'PVC Sewer Pipe and Fittings'
  issuing_body  text not null,         -- 'Canadian Standards Association'
  scope         text,                  -- the explanatory paragraph
  edition       text,                  -- 'CSA B182.2-19'
  source_url    text,
  source_label  text,                  -- 'CSA Group — B182.2'
  is_canadian   boolean not null default true,
  confidence    text not null default 'unverified'
                  check (confidence in ('high','medium','unverified')),
  -- Workflow status
  status        text not null default 'published'
                  check (status in ('pending','published','rejected','archived')),
  -- Provenance
  submitted_by  uuid references profiles(id),
  verified_by   uuid references profiles(id),
  verified_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_codes_topic  on codes(topic_id);
create index if not exists idx_codes_status on codes(status);


-- ============================================================================
--  5. REQUIREMENTS  — the design values (cover depth, velocity, etc.) per topic
-- ============================================================================
create table if not exists requirements (
  id            uuid primary key default gen_random_uuid(),
  topic_id      text not null references topics(id) on delete cascade,
  label         text not null,         -- 'Minimum diameter (municipal main)'
  value         text not null,         -- '250 mm'
  note          text,                  -- the smaller explanatory line
  confidence    text not null default 'unverified'
                  check (confidence in ('high','medium','unverified')),
  status        text not null default 'published'
                  check (status in ('pending','published','rejected','archived')),
  submitted_by  uuid references profiles(id),
  verified_by   uuid references profiles(id),
  verified_at   timestamptz,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_reqs_topic  on requirements(topic_id);
create index if not exists idx_reqs_status on requirements(status);


-- ============================================================================
--  6. MUNICIPAL OVERRIDES  — the city-specific values
--  This is what makes the output genuinely change by city. Each row overrides
--  a field for one municipality + topic (e.g. Toronto watermain cover depth).
-- ============================================================================
create table if not exists municipal_overrides (
  id              uuid primary key default gen_random_uuid(),
  municipality_id text not null references municipalities(id) on delete cascade,
  topic_id        text references topics(id) on delete cascade,  -- null = applies to whole discipline
  field_key       text not null,       -- 'authority','cover_water','idf_source','design_doc', ...
  field_label     text not null,       -- human-readable label shown in the spotlight
  field_value     text not null,       -- the actual value
  source_url      text,
  confidence      text not null default 'unverified'
                    check (confidence in ('high','medium','unverified')),
  status          text not null default 'published'
                    check (status in ('pending','published','rejected','archived')),
  submitted_by    uuid references profiles(id),
  verified_by     uuid references profiles(id),
  verified_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_over_muni  on municipal_overrides(municipality_id);
create index if not exists idx_over_topic on municipal_overrides(topic_id);


-- ============================================================================
--  7. FLAGS  — when a user reports something wrong
--  Any user can flag a code, requirement, or override. Admins review the queue.
-- ============================================================================
create table if not exists flags (
  id            uuid primary key default gen_random_uuid(),
  target_type   text not null check (target_type in ('code','requirement','override')),
  target_id     uuid not null,         -- the id of the flagged row
  reason        text not null,         -- 'outdated','incorrect','missing','other'
  detail        text,                  -- the user's explanation
  submitted_by  uuid references profiles(id),
  status        text not null default 'open'
                  check (status in ('open','resolved','dismissed')),
  resolved_by   uuid references profiles(id),
  created_at    timestamptz not null default now()
);

create index if not exists idx_flags_status on flags(status);


-- ============================================================================
--  8. AUDIT LOG  — a permanent record of every change to data
--  This is your legal/professional safety net. Nothing is ever silently changed.
-- ============================================================================
create table if not exists audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references profiles(id),
  action      text not null,           -- 'submit','approve','reject','edit','flag'
  target_type text not null,           -- 'code','requirement','override','flag'
  target_id   uuid,
  detail      jsonb,                   -- snapshot of what changed
  created_at  timestamptz not null default now()
);

create index if not exists idx_audit_target on audit_log(target_type, target_id);


-- ============================================================================
--  AUTO-UPDATE updated_at ON EDITS
-- ============================================================================
create or replace function touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_codes_touch on codes;
create trigger trg_codes_touch before update on codes
  for each row execute function touch_updated_at();

drop trigger if exists trg_reqs_touch on requirements;
create trigger trg_reqs_touch before update on requirements
  for each row execute function touch_updated_at();

drop trigger if exists trg_over_touch on municipal_overrides;
create trigger trg_over_touch before update on municipal_overrides
  for each row execute function touch_updated_at();


-- ============================================================================
--  AUTO-CREATE A PROFILE WHEN SOMEONE SIGNS UP
--  When a new auth user is created, automatically give them an engineer profile.
-- ============================================================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_new_user on auth.users;
create trigger trg_new_user after insert on auth.users
  for each row execute function handle_new_user();
