-- Catalog
GRANT USE CATALOG ON CATALOG finance TO data_science_role;

-- Schema
GRANT USE SCHEMA ON SCHEMA finance.credit TO data_science_role;

-- Tables
GRANT SELECT ON TABLE finance.credit.features TO data_science_role;

-- No raw PII access
REVOKE SELECT ON TABLE finance.raw.customers FROM data_science_role;
