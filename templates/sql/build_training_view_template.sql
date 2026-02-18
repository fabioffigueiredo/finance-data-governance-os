-- TEMPLATE ONLY (placeholders). Do not run as-is.
-- Purpose: Build a governed TRAINING VIEW with minimization/masking.
-- Replace <SCHEMA>, <TABLE>, <FEATURES>, <DATE_FIELD>, <LABEL_RULE> with your environment.

CREATE OR REPLACE VIEW <SCHEMA>.vw_train_<usecase> AS
SELECT
  -- Minimization: include only required features
  <FEATURES>,
  -- Example of pseudonymous key (replace with your tokenization strategy)
  hash(<CUSTOMER_ID>) AS customer_key,
  -- Label (define per use case, carefully avoiding leakage)
  <LABEL_RULE> AS label
FROM <SCHEMA>.<TABLE>
WHERE <DATE_FIELD> BETWEEN <START_DATE> AND <END_DATE>;
