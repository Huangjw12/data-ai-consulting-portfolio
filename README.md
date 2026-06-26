# Jingwen (Wendy) Huang — Crypto Compliance & Fraud Analytics Portfolio

> **Branch:** `crypto` — job-search portfolio for crypto exchange Risk / Compliance / Fraud analytics roles (APAC).  
> **Main branch:** general data & consulting materials.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![GitHub](https://img.shields.io/badge/GitHub-Huangjw12-181717?logo=github)](https://github.com/Huangjw12/data-ai-consulting-portfolio/tree/crypto)
[![PL-300](https://img.shields.io/badge/In%20Progress-PL--300-0078D4?logo=microsoft)](https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/)
[![CCAS](https://img.shields.io/badge/Planned-ACAMS%20CCAS-green)]()

**Target roles:** Data Analyst (Risk) · Compliance Analytics · Fraud Analytics · Business Analytics Manager  
**Target companies:** Binance · OKX · Crypto.com · Bybit · Chainalysis · Elliptic  
**Location:** Singapore · Hong Kong · Remote APAC · **Available from:** [Month Year]

---

## Elevator Pitch

Deloitte consultant (**5 years**) with **Computer Science** degree. I combine **compliance advisory**, **fraud investigation**, and **hands-on analytics** (SQL, Power BI, Python) to help crypto platforms improve **KYC fraud prevention**, **transaction monitoring**, and **compliance ops KPIs**.

> All data is **synthetic or public**. Client names anonymized.

---

## Portfolio Progress

| Project | Status | Link |
|---------|--------|------|
| **01 — Transaction Monitoring Dashboard** | 🟡 In progress | [projects/01-tm-dashboard/](./projects/01-tm-dashboard/) |
| **02 — On-Chain AML Explorer** | ⚪ Planned | [projects/02-onchain-aml-explorer/](./projects/02-onchain-aml-explorer/) |
| **03 — Compliance KPI Framework** | 🟡 Draft | [projects/03-compliance-kpi-framework/](./projects/03-compliance-kpi-framework/) |
| **04 — SQL Alert Analytics** | ⚪ Planned | [projects/04-sql-alert-analytics/](./projects/04-sql-alert-analytics/) |
| **Case Studies (Deloitte)** | 🟡 Templates ready | [case-studies/](./case-studies/) |

Legend: 🟢 Done · 🟡 In progress · ⚪ Planned

---

## Featured Project: TM Dashboard

Synthetic **crypto exchange transaction monitoring** dataset + Power BI star schema.

```bash
cd projects/01-tm-dashboard
pip install pandas numpy
python generate_sample_data.py
# Import data/*.csv into Power BI — see DATA_SCHEMA.md
```

| Page | KPIs |
|------|------|
| Ops Overview | Alert volume · Open cases · MTTR |
| Rule Health | FP rate · TP rate · Hit rate by rule |
| Geo & KYC | Country risk · KYC tier · Onboarding channel |
| Case Management | SLA compliance · SAR funnel · Analyst workload |

📄 [Schema & field dictionary](./projects/01-tm-dashboard/DATA_SCHEMA.md) · [SQL DDL](./projects/01-tm-dashboard/schema.sql)

---

## Case Studies

| # | Title | Crypto angle |
|---|-------|--------------|
| 1 | [Compliance & Data Controls](./case-studies/01-compliance-data-controls.md) | KYC data quality · control monitoring |
| 2 | [Fraud Investigation Analytics](./case-studies/02-fraud-investigation-analytics.md) | Typology analysis · loss / control metrics |
| 3 | [AI-Enabled Compliance Transformation](./case-studies/03-ai-compliance-transformation.md) | Alert triage · GenAI governance |

Each includes **STAR script** + **Crypto Translation** for interviews.

---

## Knowledge Base

| Doc | Purpose |
|-----|---------|
| [AML & Crypto Glossary](./knowledge/aml-crypto-glossary.md) | 50 terms for interviews |
| [Fraud Typologies Cheatsheet](./knowledge/fraud-typologies-cheatsheet.md) | Exchange-relevant typologies |

---

## Tech Stack

| Domain | Tools |
|--------|-------|
| Compliance / Fraud | KYC · CDD · TM · SAR/STR · typologies · FATF VASP (studying) |
| Analytics | SQL · Power BI · Python (pandas) · Excel |
| Blockchain | Etherscan · sanctions lists · on-chain tracing concepts |
| AI | GenAI for case triage · prompt design · human-in-the-loop |
| Certs | PL-300 (in progress) · ACAMS CCAS (planned) |

---

## Repository Map

```
portfolio/  (crypto branch)
├── README.md                          ← you are here
├── case-studies/                      ← Deloitte STAR cases (anonymized)
├── projects/
│   ├── 01-tm-dashboard/               ← synthetic TM data + PBI
│   ├── 02-onchain-aml-explorer/       ← public chain demo
│   ├── 03-compliance-kpi-framework/   ← KPI definitions doc
│   └── 04-sql-alert-analytics/        ← alert analysis SQL
├── knowledge/                         ← glossary & typologies
├── career/                            ← target cos & templates (no private data)
├── assets/screenshots/                ← dashboard screenshots
├── certifications/                    ← cert links & badges
└── archive/learning/                  ← PL-300 plan, study notes
```

---

## Career Materials

- [Target companies & role keywords](./career/target-companies.md)
- [Application tracker template](./career/application-tracker-template.md)
- [Cover letter template](./career/cover-letter-template.md)

---

## Experience Summary

**Deloitte** — [Title] · [City] · [Years]  
Compliance advisory · Fraud / data analytics · Management consulting · [Industries]

**Education:** B.Sc. Computer Science — [University]

---

## Contact

- **Email:** your.email@example.com
- **LinkedIn:** [YOUR_PROFILE](https://linkedin.com/in/YOUR_PROFILE)
- **GitHub:** [Huangjw12/data-ai-consulting-portfolio](https://github.com/Huangjw12/data-ai-consulting-portfolio/tree/crypto)

---

*Last updated: June 2026 · View this portfolio on the `crypto` branch*
