-- ============================================================================
--  CivilRef.ca — Seed Data
--  Run this AFTER 01_schema.sql and 02_security.sql.
--  It loads the structure (disciplines, topics, municipalities) and the
--  verified city-specific data you already built, so you start with content.
--
--  NOTE: This runs as the project owner in the SQL Editor, which bypasses RLS,
--  so it can insert published rows directly. Engineers using the app cannot.
-- ============================================================================

-- ----------------------------------------------------------------------------
--  DISCIPLINES
-- ----------------------------------------------------------------------------
insert into disciplines (id, label, icon, color, description, sort_order) values
  ('utilities','Utilities','⬡','#4a90d9','Watermain, sanitary sewer, storm sewer, force main, dry utilities',1),
  ('traffic','Traffic','⊕','#c9983a','Road geometric design, traffic signals, transportation impact studies, pavement',2),
  ('structural','Structural','▦','#9b7fe8','Buildings, bridges, concrete, steel, wood / mass timber',3),
  ('civil','Civil','◈','#3dbe8a','Site grading, earthworks, geotechnical, environmental, survey',4),
  ('construction','Construction','▣','#2dbfbf','Specifications, contracts, construction H&S, quality control',5)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
--  TOPICS  (the subtypes under each discipline)
-- ----------------------------------------------------------------------------
insert into topics (id, discipline_id, title, diagram_key, sort_order) values
  ('watermain','utilities','Watermain — Potable Water Design','watermain',1),
  ('sanitary','utilities','Sanitary Sewer Design','sanitary',2),
  ('storm','utilities','Storm Sewer Design','storm',3),
  ('forcemain','utilities','Force Main (Pressure Sewer) Design','forcemain',4),
  ('geometric','traffic','Road Geometric Design','geometric',1),
  ('pavement','traffic','Pavement Design','pavement',2),
  ('signals','traffic','Traffic Signals — Design & Warrants',null,3),
  ('tis','traffic','Transportation Impact Study (TIS)',null,4),
  ('concrete','structural','Concrete Structure Design','concrete',1),
  ('steel','structural','Structural Steel Design',null,2),
  ('wood','structural','Wood & Mass Timber Design',null,3),
  ('bridges','structural','Bridge & Culvert Design','bridges',4),
  ('grading','civil','Site Grading & Earthworks','grading',1),
  ('geotech','civil','Geotechnical Investigation & Foundation Design','geotech',2),
  ('environmental','civil','Environmental Site Assessment',null,3),
  ('safety','construction','Construction Health & Safety — Ontario',null,1),
  ('specs','construction','Construction Specifications & Contracts',null,2),
  ('qc','construction','Construction Quality Control & Testing',null,3)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
--  MUNICIPALITIES  (33 cities; 5 marked verified)
-- ----------------------------------------------------------------------------
insert into municipalities (id, name, province, is_verified) values
  ('toronto-on','Toronto, ON','ON',true),
  ('ottawa-on','Ottawa, ON','ON',true),
  ('calgary-ab','Calgary, AB','AB',true),
  ('edmonton-ab','Edmonton, AB','AB',true),
  ('vancouver-bc','Vancouver, BC','BC',true),
  ('mississauga-on','Mississauga, ON','ON',false),
  ('brampton-on','Brampton, ON','ON',false),
  ('hamilton-on','Hamilton, ON','ON',false),
  ('london-on','London, ON','ON',false),
  ('markham-on','Markham, ON','ON',false),
  ('vaughan-on','Vaughan, ON','ON',false),
  ('kitchener-on','Kitchener, ON','ON',false),
  ('windsor-on','Windsor, ON','ON',false),
  ('thunderbay-on','Thunder Bay, ON','ON',false),
  ('sudbury-on','Sudbury, ON','ON',false),
  ('surrey-bc','Surrey, BC','BC',false),
  ('burnaby-bc','Burnaby, BC','BC',false),
  ('richmond-bc','Richmond, BC','BC',false),
  ('kelowna-bc','Kelowna, BC','BC',false),
  ('victoria-bc','Victoria, BC','BC',false),
  ('reddeer-ab','Red Deer, AB','AB',false),
  ('lethbridge-ab','Lethbridge, AB','AB',false),
  ('fortmcmurray-ab','Fort McMurray, AB','AB',false),
  ('winnipeg-mb','Winnipeg, MB','MB',false),
  ('regina-sk','Regina, SK','SK',false),
  ('saskatoon-sk','Saskatoon, SK','SK',false),
  ('halifax-ns','Halifax, NS','NS',false),
  ('moncton-nb','Moncton, NB','NB',false),
  ('fredericton-nb','Fredericton, NB','NB',false),
  ('stjohns-nl',E'St. John\'s, NL','NL',false),
  ('charlottetown-pe','Charlottetown, PE','PE',false),
  ('yellowknife-nt','Yellowknife, NT','NT',false),
  ('whitehorse-yt','Whitehorse, YT','YT',false)
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
--  MUNICIPAL OVERRIDES  — the verified city-specific data
--  These are loaded as 'published' + 'high' confidence for authorities/docs,
--  and 'medium' for the climate-estimated cover depths (flagged to confirm).
-- ----------------------------------------------------------------------------
insert into municipal_overrides (municipality_id, topic_id, field_key, field_label, field_value, confidence, status) values
  -- Toronto watermain
  ('toronto-on','watermain','authority','Reviewing authority','Toronto Water — Engineering & Construction Services','high','published'),
  ('toronto-on','watermain','design_doc','Design criteria document','City of Toronto Design Criteria for Sewers and Watermains','high','published'),
  ('toronto-on','watermain','cover','Minimum cover (this city)','1.7 m minimum to obvert (≈2.0 m under arterial roads)','medium','published'),
  -- Ottawa watermain
  ('ottawa-on','watermain','authority','Reviewing authority','City of Ottawa — Infrastructure Services (Water & Sewer)','high','published'),
  ('ottawa-on','watermain','design_doc','Design criteria document','City of Ottawa Sewer Design Guidelines + Water Distribution Design Guidelines','high','published'),
  ('ottawa-on','watermain','cover','Minimum cover (this city)','2.4 m minimum to obvert (Ottawa frost depth exceeds Toronto)','medium','published'),
  -- Calgary watermain
  ('calgary-ab','watermain','authority','Reviewing authority','City of Calgary — Water Resources','high','published'),
  ('calgary-ab','watermain','design_doc','Design criteria document','City of Calgary Standard Specifications (Waterworks & Sewer)','high','published'),
  ('calgary-ab','watermain','cover','Minimum cover (this city)','2.4 m minimum to obvert (cold-climate frost protection)','medium','published'),
  -- Edmonton watermain (EPCOR — the key distinguishing fact)
  ('edmonton-ab','watermain','authority','Reviewing authority','EPCOR — Water Services & Drainage Services (NOT the City of Edmonton)','high','published'),
  ('edmonton-ab','watermain','design_doc','Design criteria document','EPCOR Design and Construction Standards','high','published'),
  ('edmonton-ab','watermain','cover','Minimum cover (this city)','2.5 m minimum to obvert (deepest frost among major cities)','medium','published'),
  -- Vancouver watermain (Metro Vancouver)
  ('vancouver-bc','watermain','authority','Reviewing authority','City of Vancouver Engineering (local); Metro Vancouver (regional trunk)','high','published'),
  ('vancouver-bc','watermain','design_doc','Design criteria document','City of Vancouver Engineering Design Manual','high','published'),
  ('vancouver-bc','watermain','cover','Minimum cover (this city)','1.0–1.2 m minimum to obvert (mild coastal climate)','medium','published')
on conflict do nothing;

-- You can add sanitary/storm overrides for each city the same way as you verify them.
