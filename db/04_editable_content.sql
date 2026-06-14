-- ============================================================================
--  CivilRef.ca — Migration 04: Editable Content
--  Run this AFTER 01_schema.sql, 02_security.sql, and 03_seed.sql, in the
--  Supabase SQL Editor. Safe to run once.
--
--  WHAT THIS DOES, IN PLAIN ENGLISH:
--  Adds a table that holds editable content blocks — the About pages for each
--  discipline, and any other content you want admins to be able to update
--  without redeploying the app. Each block is identified by:
--    content_type   (e.g. 'about')
--    discipline_id  (e.g. 'utilities')   — nullable for non-discipline content
--    section_key    (e.g. 'overview', 'careers')
--  When the main app loads an About page, it fetches the rows for that
--  discipline and displays the body text. When an admin edits a section in the
--  dashboard, it updates the row. Every edit is logged in audit_log.
-- ============================================================================

create table if not exists editable_content (
  id            uuid primary key default gen_random_uuid(),
  content_type  text not null,                -- 'about','privacy','disclosure', etc.
  discipline_id text references disciplines(id) on delete cascade,  -- nullable
  section_key   text not null,                -- 'headline','overview','scope', etc.
  body          text not null default '',
  status        text not null default 'published'
                  check (status in ('draft','published','archived')),
  updated_by    uuid references profiles(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- A content block is uniquely identified by these three fields together.
  -- The admin dashboard uses upsert with this conflict target.
  unique (content_type, discipline_id, section_key)
);

create index if not exists idx_content_lookup
  on editable_content(content_type, discipline_id, status);

-- Keep updated_at fresh on every change.
drop trigger if exists trg_content_touch on editable_content;
create trigger trg_content_touch before update on editable_content
  for each row execute function touch_updated_at();


-- ============================================================================
--  ROW LEVEL SECURITY
--  Same principle as the rest of the platform:
--    • Public can READ published content (so the main app can display it).
--    • Only admins can INSERT, UPDATE, or DELETE.
--  No engineer-submission workflow on About content — admins edit directly,
--  every change goes to the audit log.
-- ============================================================================
alter table editable_content enable row level security;

create policy "content public read published"
  on editable_content for select
  using (status = 'published');

create policy "admins manage content"
  on editable_content for all
  to authenticated
  using (is_admin())
  with check (is_admin());


-- ============================================================================
--  SEED — start each About page with an empty published row per section
--  so the admin dashboard has something to load. Admins fill them in.
-- ============================================================================
insert into editable_content (content_type, discipline_id, section_key, body, status) values
  ('about','utilities','headline','','published'),
  ('about','utilities','overview','','published'),
  ('about','utilities','scope','','published'),
  ('about','utilities','projects','','published'),
  ('about','utilities','standards','','published'),
  ('about','utilities','careers','','published'),
  ('about','utilities','further','','published'),

  ('about','traffic','headline','','published'),
  ('about','traffic','overview','','published'),
  ('about','traffic','scope','','published'),
  ('about','traffic','projects','','published'),
  ('about','traffic','standards','','published'),
  ('about','traffic','careers','','published'),
  ('about','traffic','further','','published'),

  ('about','structural','headline','','published'),
  ('about','structural','overview','','published'),
  ('about','structural','scope','','published'),
  ('about','structural','projects','','published'),
  ('about','structural','standards','','published'),
  ('about','structural','careers','','published'),
  ('about','structural','further','','published'),

  ('about','civil','headline','','published'),
  ('about','civil','overview','','published'),
  ('about','civil','scope','','published'),
  ('about','civil','projects','','published'),
  ('about','civil','standards','','published'),
  ('about','civil','careers','','published'),
  ('about','civil','further','','published'),

  ('about','construction','headline','','published'),
  ('about','construction','overview','','published'),
  ('about','construction','scope','','published'),
  ('about','construction','projects','','published'),
  ('about','construction','standards','','published'),
  ('about','construction','careers','','published'),
  ('about','construction','further','','published')
on conflict (content_type, discipline_id, section_key) do nothing;
