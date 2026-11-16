-- One-time data fix for the 3 published case studies (table: projects).
-- Fixes details copied from another case study, and image links that were saved
-- as http://localhost:5000/uploads/... (the backend's own address), which no
-- visitor can load. Safe to run more than once.
--
-- Run on the VPS (database name and user as in backend/.env):
--   mysql -u <DB_USER> -p <DB_NAME> < /var/www/Codigix_IT/deploy/sql/2026-11-16-fix-case-studies.sql
--   pm2 restart codigixinfotech-backend      # the API caches case studies for 5 minutes

START TRANSACTION;

-- #40 Brainlance Solutions: the sidebar named "Sterling Techno System" as the
-- client, with industry "Manufacturing" and type "ERP + IIoT Integration".
UPDATE projects
SET sidebarSpecs = '{"client":"Brainlance Solutions LLP","liveUrl":"https://brainlancesolutions.com","duration":"6 Months","industry":"HR & Recruitment","projectType":"HR & Recruitment Platform","technologies":"Node.js, React, MySQL"}'
WHERE id = 40;

-- #40 highlights described IIoT machine monitoring; these come from the
-- study's own key features
UPDATE projects
SET solutionHighlights = '["Applicant tracking from application to hire","Central resume database with advanced filtering","Automated interview scheduling and feedback collection","Employee records, onboarding and training management","Real-time recruitment KPIs and hiring analytics"]'
WHERE id = 40;

-- #46 SP Techpioneer: the business challenge named "Sterling Techno Systems"
UPDATE projects
SET businessChallengeDesc = REPLACE(businessChallengeDesc, 'Sterling Techno Systems was managing', 'SP Techpioneer was managing')
WHERE id = 46;

-- All case studies: image links the live site can load (/api/uploads/<file>)
UPDATE projects
SET image       = REPLACE(image,       'http://localhost:5000/uploads/', '/api/uploads/'),
    heroImage   = REPLACE(heroImage,   'http://localhost:5000/uploads/', '/api/uploads/'),
    client_logo = REPLACE(client_logo, 'http://localhost:5000/uploads/', '/api/uploads/')
WHERE image LIKE 'http://localhost:5000/uploads/%'
   OR heroImage LIKE 'http://localhost:5000/uploads/%'
   OR client_logo LIKE 'http://localhost:5000/uploads/%';

COMMIT;

-- Check: every row should show the right client and /api/uploads/ images
SELECT id, client, JSON_UNQUOTE(JSON_EXTRACT(sidebarSpecs, '$.client')) AS sidebar_client, image, heroImage
FROM projects ORDER BY id;
