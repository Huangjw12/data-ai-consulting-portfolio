# Project 04 — SQL Alert Analytics

**Status:** ⚪ Planned (Target: Jul 2026)  
**Depends on:** [01-tm-dashboard](../01-tm-dashboard/) synthetic data

## Objective

SQL portfolio proving you can **investigate alerts and tune rules** — core Binance Risk Analyst skill.

## Planned queries (`queries/`)

| # | File | Business question |
|---|------|-------------------|
| 1 | `01_alert_volume_by_rule.sql` | Which rules fire most? |
| 2 | `02_false_positive_by_rule.sql` | Which rules need tuning? |
| 3 | `03_alert_trend_daily.sql` | Volume spike detection |
| 4 | `04_case_sla_breach.sql` | SLA breach root causes |
| 5 | `05_country_risk_alerts.sql` | Geo concentration |
| 6 | `06_kyc_tier_fp_rate.sql` | FP rate by KYC tier |
| 7 | `07_analyst_workload.sql` | Capacity planning |
| 8 | `08_sar_funnel.sql` | SAR conversion funnel |

## Setup

```bash
# Load CSVs into SQLite or import to warehouse
sqlite3 tm.db < ../01-tm-dashboard/schema.sql
# Then run queries from queries/
```

## Acceptance criteria

- [ ] 8 queries with English comments
- [ ] README with sample output screenshots
- [ ] 1 query uses window functions + CTE
