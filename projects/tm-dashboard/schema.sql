-- Transaction Monitoring Dashboard — Synthetic Schema
-- SQLite-compatible DDL. Import CSVs or run generator first.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS dim_date (
    date_key        INTEGER PRIMARY KEY,
    full_date       TEXT NOT NULL,
    year            INTEGER NOT NULL,
    quarter         INTEGER NOT NULL,
    month           INTEGER NOT NULL,
    month_name      TEXT NOT NULL,
    week_of_year    INTEGER NOT NULL,
    day_of_week     INTEGER NOT NULL,
    is_weekend      INTEGER NOT NULL CHECK (is_weekend IN (0, 1))
);

CREATE TABLE IF NOT EXISTS dim_country (
    country_key     INTEGER PRIMARY KEY,
    country_code    TEXT NOT NULL UNIQUE,
    country_name    TEXT NOT NULL,
    region          TEXT NOT NULL,
    risk_tier       TEXT NOT NULL CHECK (risk_tier IN ('Low', 'Medium', 'High', 'Prohibited')),
    is_sanctioned   INTEGER NOT NULL CHECK (is_sanctioned IN (0, 1))
);

CREATE TABLE IF NOT EXISTS dim_user (
    user_key                    INTEGER PRIMARY KEY,
    user_id                     TEXT NOT NULL UNIQUE,
    country_key                 INTEGER NOT NULL REFERENCES dim_country(country_key),
    kyc_tier                    TEXT NOT NULL CHECK (kyc_tier IN ('L0', 'L1', 'L2', 'L3')),
    kyc_status                  TEXT NOT NULL,
    onboarding_channel          TEXT NOT NULL,
    account_age_days            INTEGER NOT NULL,
    is_pep                      INTEGER NOT NULL CHECK (is_pep IN (0, 1)),
    is_high_risk_occupation     INTEGER NOT NULL CHECK (is_high_risk_occupation IN (0, 1)),
    device_risk_score           REAL NOT NULL,
    first_deposit_date          TEXT,
    is_active_30d               INTEGER NOT NULL CHECK (is_active_30d IN (0, 1))
);

CREATE TABLE IF NOT EXISTS dim_rule (
    rule_key            INTEGER PRIMARY KEY,
    rule_id             TEXT NOT NULL UNIQUE,
    rule_name           TEXT NOT NULL,
    rule_category       TEXT NOT NULL,
    rule_type           TEXT NOT NULL,
    severity_default    TEXT NOT NULL,
    is_active           INTEGER NOT NULL CHECK (is_active IN (0, 1)),
    owner_team          TEXT NOT NULL,
    last_tuned_date     TEXT
);

CREATE TABLE IF NOT EXISTS dim_typology (
    typology_key        INTEGER PRIMARY KEY,
    typology_code       TEXT NOT NULL UNIQUE,
    typology_name       TEXT NOT NULL,
    typology_group      TEXT NOT NULL,
    description         TEXT
);

CREATE TABLE IF NOT EXISTS dim_analyst (
    analyst_key         INTEGER PRIMARY KEY,
    analyst_id          TEXT NOT NULL UNIQUE,
    analyst_name        TEXT NOT NULL,
    team                TEXT NOT NULL,
    region              TEXT NOT NULL,
    is_active           INTEGER NOT NULL CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS fact_transaction (
    transaction_id          TEXT PRIMARY KEY,
    tx_date_key             INTEGER NOT NULL REFERENCES dim_date(date_key),
    user_key                INTEGER NOT NULL REFERENCES dim_user(user_key),
    tx_timestamp            TEXT NOT NULL,
    tx_type                 TEXT NOT NULL,
    asset                   TEXT NOT NULL,
    amount                  REAL NOT NULL,
    amount_usd              REAL NOT NULL,
    channel                 TEXT NOT NULL,
    counterparty_risk_score REAL,
    is_successful           INTEGER NOT NULL CHECK (is_successful IN (0, 1)),
    failure_reason          TEXT,
    ip_country_code         TEXT,
    device_id_hash          TEXT
);

CREATE TABLE IF NOT EXISTS fact_case (
    case_id                 TEXT PRIMARY KEY,
    open_date_key           INTEGER NOT NULL REFERENCES dim_date(date_key),
    close_date_key          INTEGER REFERENCES dim_date(date_key),
    user_key                INTEGER NOT NULL REFERENCES dim_user(user_key),
    primary_typology_key    INTEGER NOT NULL REFERENCES dim_typology(typology_key),
    analyst_key             INTEGER REFERENCES dim_analyst(analyst_key),
    case_status             TEXT NOT NULL,
    case_priority           TEXT NOT NULL,
    case_outcome            TEXT,
    linked_alert_count      INTEGER NOT NULL DEFAULT 1,
    time_to_close_hours     REAL,
    sla_hours               INTEGER NOT NULL,
    is_sla_breached         INTEGER CHECK (is_sla_breached IN (0, 1)),
    sar_filed               INTEGER NOT NULL DEFAULT 0 CHECK (sar_filed IN (0, 1)),
    loss_prevented_usd      REAL DEFAULT 0,
    investigation_notes     TEXT
);

CREATE TABLE IF NOT EXISTS fact_alert (
    alert_id                    TEXT PRIMARY KEY,
    alert_date_key              INTEGER NOT NULL REFERENCES dim_date(date_key),
    alert_timestamp             TEXT NOT NULL,
    user_key                    INTEGER NOT NULL REFERENCES dim_user(user_key),
    rule_key                    INTEGER NOT NULL REFERENCES dim_rule(rule_key),
    typology_key                INTEGER NOT NULL REFERENCES dim_typology(typology_key),
    transaction_id              TEXT REFERENCES fact_transaction(transaction_id),
    severity                    TEXT NOT NULL,
    alert_score                 REAL NOT NULL,
    alert_status                TEXT NOT NULL,
    disposition                 TEXT NOT NULL,
    disposition_date_key        INTEGER REFERENCES dim_date(date_key),
    case_id                     TEXT REFERENCES fact_case(case_id),
    time_to_disposition_hours   REAL,
    is_sar_candidate            INTEGER NOT NULL DEFAULT 0 CHECK (is_sar_candidate IN (0, 1)),
    analyst_l1_key              INTEGER REFERENCES dim_analyst(analyst_key)
);

-- Useful views for Power BI / SQL analytics

CREATE VIEW IF NOT EXISTS vw_alert_kpis AS
SELECT
    a.alert_id,
    a.alert_date_key,
    d.full_date AS alert_date,
    r.rule_id,
    r.rule_name,
    t.typology_code,
    t.typology_name,
    u.kyc_tier,
    c.country_name,
    a.severity,
    a.alert_status,
    a.disposition,
    a.time_to_disposition_hours,
    a.is_sar_candidate,
    CASE WHEN a.disposition = 'False Positive' THEN 1 ELSE 0 END AS is_false_positive,
    CASE WHEN a.disposition = 'True Positive' THEN 1 ELSE 0 END AS is_true_positive
FROM fact_alert a
JOIN dim_date d ON a.alert_date_key = d.date_key
JOIN dim_rule r ON a.rule_key = r.rule_key
JOIN dim_typology t ON a.typology_key = t.typology_key
JOIN dim_user u ON a.user_key = u.user_key
JOIN dim_country c ON u.country_key = c.country_key;

CREATE VIEW IF NOT EXISTS vw_case_kpis AS
SELECT
    c.case_id,
    c.open_date_key,
    od.full_date AS open_date,
    cd.full_date AS close_date,
    t.typology_name,
    a.analyst_name,
    c.case_status,
    c.case_priority,
    c.case_outcome,
    c.time_to_close_hours,
    c.sla_hours,
    c.is_sla_breached,
    c.sar_filed,
    c.loss_prevented_usd
FROM fact_case c
JOIN dim_date od ON c.open_date_key = od.date_key
LEFT JOIN dim_date cd ON c.close_date_key = cd.date_key
JOIN dim_typology t ON c.primary_typology_key = t.typology_key
LEFT JOIN dim_analyst a ON c.analyst_key = a.analyst_key;
