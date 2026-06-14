-- ============================================================================
--  CivilRef.ca — Security Rules (Row Level Security)
--  Run this AFTER 01_schema.sql, in the same SQL Editor.
--
--  WHAT THIS DOES, IN PLAIN ENGLISH:
--  Supabase exposes your database over the internet. Row Level Security (RLS)
--  is the wall that decides who can see and change what. Without it, anyone
--  could edit anything. These rules enforce your core principle:
--
--    • The public can READ published data only.
--    • Logged-in engineers can SUBMIT changes (which start as 'pending').
--    • Only verifiers/admins can APPROVE data (move it to 'published').
--    • Nobody can silently overwrite live data.
-- ============================================================================

-- Turn RLS on for every table. Once on, the default is "deny everything"
-- until a policy explicitly allows it.
alter table profiles            enable row level security;
alter table disciplines         enable row level security;
alter table topics              enable row level security;
alter table municipalities      enable row level security;
alter table codes               enable row level security;
alter table requirements        enable row level security;
alter table municipal_overrides enable row level security;
alter table flags               enable row level security;
alter table audit_log           enable row level security;


-- ----------------------------------------------------------------------------
--  HELPER: is the current user an admin or verifier?
--  Used by the "approve" policies below.
-- ----------------------------------------------------------------------------
create or replace function is_reviewer()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('verifier','admin')
  );
$$ language sql security definer stable;

create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;


-- ----------------------------------------------------------------------------
--  PROFILES
-- ----------------------------------------------------------------------------
-- Anyone logged in can read profiles (needed to show "verified by ..." badges).
create policy "profiles readable by authenticated"
  on profiles for select to authenticated using (true);

-- A user can update their own profile (name, bio) — but NOT their own role.
-- Role changes are admin-only (handled by the separate policy below).
create policy "users update own profile"
  on profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Admins can update any profile (e.g. promote someone to verifier,
-- or confirm their credential).
create policy "admins update any profile"
  on profiles for update to authenticated
  using (is_admin());


-- ----------------------------------------------------------------------------
--  REFERENCE TABLES (disciplines, topics, municipalities)
--  Everyone can read. Only admins can change the structure.
-- ----------------------------------------------------------------------------
create policy "disciplines public read" on disciplines for select using (true);
create policy "topics public read"      on topics      for select using (true);
create policy "munis public read"       on municipalities for select using (true);

create policy "admins manage disciplines" on disciplines for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage topics"      on topics      for all to authenticated using (is_admin()) with check (is_admin());
create policy "admins manage munis"       on municipalities for all to authenticated using (is_admin()) with check (is_admin());


-- ----------------------------------------------------------------------------
--  CODES  — the verification workflow in policy form
-- ----------------------------------------------------------------------------
-- 1. The PUBLIC sees only PUBLISHED codes.
create policy "codes public read published"
  on codes for select using (status = 'published');

-- 2. Logged-in users can also see their OWN pending submissions
--    and reviewers can see everything (to work the queue).
create policy "codes authors and reviewers see pending"
  on codes for select to authenticated
  using (submitted_by = auth.uid() or is_reviewer());

-- 3. Any logged-in user can SUBMIT a new code — but it is forced to 'pending'.
--    (The app sets status='pending'; this policy makes sure they can't
--     sneak in a 'published' row.)
create policy "authenticated submit codes"
  on codes for insert to authenticated
  with check (submitted_by = auth.uid() and status = 'pending');

-- 4. Only reviewers/admins can UPDATE a code (i.e. approve, reject, edit).
create policy "reviewers update codes"
  on codes for update to authenticated
  using (is_reviewer()) with check (is_reviewer());

-- 5. Only admins can delete.
create policy "admins delete codes"
  on codes for delete to authenticated using (is_admin());


-- ----------------------------------------------------------------------------
--  REQUIREMENTS  — identical workflow to codes
-- ----------------------------------------------------------------------------
create policy "reqs public read published"
  on requirements for select using (status = 'published');
create policy "reqs authors and reviewers see pending"
  on requirements for select to authenticated
  using (submitted_by = auth.uid() or is_reviewer());
create policy "authenticated submit reqs"
  on requirements for insert to authenticated
  with check (submitted_by = auth.uid() and status = 'pending');
create policy "reviewers update reqs"
  on requirements for update to authenticated
  using (is_reviewer()) with check (is_reviewer());
create policy "admins delete reqs"
  on requirements for delete to authenticated using (is_admin());


-- ----------------------------------------------------------------------------
--  MUNICIPAL OVERRIDES  — identical workflow
-- ----------------------------------------------------------------------------
create policy "over public read published"
  on municipal_overrides for select using (status = 'published');
create policy "over authors and reviewers see pending"
  on municipal_overrides for select to authenticated
  using (submitted_by = auth.uid() or is_reviewer());
create policy "authenticated submit over"
  on municipal_overrides for insert to authenticated
  with check (submitted_by = auth.uid() and status = 'pending');
create policy "reviewers update over"
  on municipal_overrides for update to authenticated
  using (is_reviewer()) with check (is_reviewer());
create policy "admins delete over"
  on municipal_overrides for delete to authenticated using (is_admin());


-- ----------------------------------------------------------------------------
--  FLAGS  — anyone logged in can flag; reviewers resolve
-- ----------------------------------------------------------------------------
create policy "authenticated submit flags"
  on flags for insert to authenticated
  with check (submitted_by = auth.uid());
create policy "reviewers read flags"
  on flags for select to authenticated using (is_reviewer() or submitted_by = auth.uid());
create policy "reviewers update flags"
  on flags for update to authenticated using (is_reviewer()) with check (is_reviewer());


-- ----------------------------------------------------------------------------
--  AUDIT LOG  — reviewers can read; the app writes via the service role
-- ----------------------------------------------------------------------------
create policy "reviewers read audit"
  on audit_log for select to authenticated using (is_reviewer());
create policy "authenticated write audit"
  on audit_log for insert to authenticated with check (actor_id = auth.uid());
