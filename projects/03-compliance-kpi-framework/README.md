# Project 03 — Compliance Ops KPI Framework

**Status:** 🟡 Draft  
**Format:** Consulting-style 2–3 page PDF / Markdown

## Purpose

Show **management consulting** strength: define how a crypto exchange Risk / Compliance leader measures program health.

## KPI catalog

### Transaction Monitoring

| KPI | Formula | Owner |
|-----|---------|-------|
| Alert rate | Alerts ÷ active users × 1,000 | TM Ops |
| False positive rate | FP ÷ (FP + TP) | Rule owners |
| True positive rate | TP ÷ (FP + TP) | Fraud |
| Rule hit rate | Rule alerts ÷ eligible events | Analytics |
| MTTR | Avg(case close − open) | Case mgmt |
| SLA compliance % | Cases within SLA ÷ closed | Ops |
| SAR conversion % | SARs ÷ escalated cases | Compliance |

### KYC / Onboarding

| KPI | Formula | Owner |
|-----|---------|-------|
| KYC pass rate | Approved ÷ submitted | KYC Ops |
| Manual review rate | Manual ÷ total applications | KYC |
| Time to verify | Avg(approve − submit) | KYC |
| Document fraud rate | Doc-fraud cases ÷ reviews | Fraud |

### Program health

| KPI | Formula | Owner |
|-----|---------|-------|
| Analyst throughput | Cases closed ÷ analyst ÷ week | Team lead |
| Alert backlog | Open alerts > 48h | TM Ops |
| Rule tuning cycle | Days rule flagged → tuned | Analytics |

## Deliverable checklist

- [ ] 2-page PDF with definitions + benchmarks (industry ranges)
- [ ] 1 slide "executive summary" version
- [ ] Link from main README

## Interview use

> "Before building dashboards, I align on KPI definitions with Compliance and Risk — this framework is how I'd run that workshop at an exchange."
