# Jingwen (Wendy) Huang — Compliance & Fraud Analytics Portfolio

> **Compliance · Fraud Analytics · Data & AI** — Big Four background translating AML/KYC, transaction monitoring, and fraud investigation into scalable analytics, rules optimization, and executive dashboards for fintech and crypto platforms.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![GitHub](https://img.shields.io/badge/GitHub-Huangjw12-181717?logo=github)](https://github.com/Huangjw12)
[![PL-300](https://img.shields.io/badge/In%20Progress-PL--300%20Data%20Analyst-0078D4?logo=microsoft)](https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:your.email@example.com)

**Open to:** Data Analyst (Risk) · Compliance Analytics · Fraud Analytics Manager · Business Analytics Manager (Crypto/Fintech)  
**Location:** Asia (Singapore · Hong Kong · Remote) · also open to Nordic fintech/regulated roles

---

## About Me

Deloitte consultant with a **Computer Science** degree and **5 years** across **compliance advisory**, **fraud / data analytics**, and **management consulting**. I bridge three worlds that crypto exchanges need in one hire:

1. **Regulatory & control mindset** — KYC/CDD, transaction monitoring, SAR/STR workflows, professional scepticism  
2. **Hands-on analytics** — SQL, Python, Power BI, rule performance metrics, false-positive analysis  
3. **Consulting delivery** — stakeholder workshops, KPI frameworks, executive storytelling, cross-functional alignment

> *All portfolio data is **synthetic or public**. No client confidential information. Deloitte engagements are anonymized.*

---

## Why Compliance + Fraud + Crypto

| Traditional strength | Crypto exchange application |
|---------------------|----------------------------|
| Compliance advisory @ Deloitte | KYC onboarding controls, sanctions alignment, FATF VASP expectations |
| Fraud / data analytics | Account takeover, bonus abuse, layering, rule tuning, case investigation |
| BI & reporting | TM ops dashboards, alert health, analyst workload, SAR pipeline metrics |
| GenAI exploration | Alert triage, case summarization, pattern extraction (human-in-the-loop) |

---

## Featured Project: Transaction Monitoring Dashboard

**Business question:** How does a Risk / Compliance ops leader monitor alert volume, rule health, false-positive rates, and investigation SLA in one view?

| | |
|---|---|
| **Scenario** | Synthetic crypto exchange — deposits, withdrawals, P2P, spot trades |
| **Tools** | SQL · Power BI (star schema) · Python (optional data generation) |
| **Schema** | [Full data dictionary & DDL](./projects/tm-dashboard/DATA_SCHEMA.md) |
| **Artifacts** | `schema.sql` · sample CSVs · `.pbix` (in progress) |

**Dashboard pages (planned):**
- **Ops Overview** — alerts/day, open cases, MTTR, SLA breach rate  
- **Rule Health** — hit rate, FP rate, TP rate by rule & typology  
- **Geography & KYC** — alerts by country, KYC tier, onboarding channel  
- **Case Drill-down** — analyst workload, disposition funnel, SAR candidates  

```bash
# Generate synthetic dataset (no real user data)
cd projects/tm-dashboard
python generate_sample_data.py
```

---

## Other Projects

### E-Commerce Analytics — SQL (foundational)

| | |
|---|---|
| **Tools** | SQL, window functions, CTEs |
| **Queries** | Retention · RFM · YoY · Top N · funnel |
| **Folder** | [./sql/](./sql/) |

### Automated Reporting Pipeline — Python

| | |
|---|---|
| **Tools** | pandas, openpyxl |
| **Use case** | Repeatable ops reporting automation |
| **Folder** | [./python/](./python/) |

### On-Chain AML Explorer *(planned)*

Public blockchain data + sanctions list concept demo — wallet risk flags, funds-flow narrative, OSINT-style investigation notes.

---

## Case Studies (Deloitte — Anonymized)

| # | Title | Crypto relevance |
|---|-------|----------------|
| 1 | [Compliance & Data Controls](./case-studies/case-study-template-1-data-governance.md) | KYC data quality · golden source · control monitoring |
| 2 | [Financial & Operational Analytics](./case-studies/case-study-template-2-financial-analytics.md) | Fraud loss analytics · control effectiveness reporting |
| 3 | [AI-Enabled Transformation](./case-studies/case-study-template-3-ai-transformation.md) | AI-assisted investigation · alert triage · governance |

Each case includes a **3-minute STAR pitch script** and **Crypto Translation** section for interview use.

---

## Compliance Ops KPI Framework

Metrics I use to discuss TM / fraud program health with Risk & Compliance leadership:

| KPI | Definition |
|-----|------------|
| **Alert rate** | Alerts per 1,000 active users (by rule / typology) |
| **False positive rate** | FP ÷ (FP + TP) after disposition |
| **Rule hit rate** | Alerts triggered ÷ eligible transactions |
| **MTTR** | Mean time to resolve case (hours) |
| **SLA compliance %** | Cases closed within SLA ÷ total closed |
| **SAR conversion rate** | SARs filed ÷ cases escalated |
| **Analyst throughput** | Cases closed per analyst per week |

Full definitions: [TM Dashboard schema doc](./projects/tm-dashboard/DATA_SCHEMA.md#kpi-definitions)

---

## Tech Stack

| Domain | Tools |
|--------|-------|
| **Compliance & fraud** | KYC/CDD concepts · TM · typologies · SAR/STR workflow · FATF VASP (studying) |
| **Analytics** | SQL · Python (pandas) · Power BI (DAX, Power Query) · Excel |
| **Blockchain (concept + hands-on)** | Etherscan · public sanctions lists · on-chain tracing concepts · Chainalysis/Elliptic workflows (familiar) |
| **AI** | GenAI for case notes & triage · prompt design · AI governance awareness |
| **Consulting** | Requirements · workshops · KPI design · executive decks |

---

## Certifications

| Certification | Status |
|---------------|--------|
| Microsoft PL-300 (Power BI Data Analyst) | In progress — 2026 |
| ACAMS CCAS (Certified Cryptoasset AFC Specialist) | Planned |
| [CAMS / other] | [Add if applicable] |

---

## Experience

### Deloitte — [Title, e.g. Senior Consultant / Analyst]
**[City, China]** · **[Start Year] – Present**

- [Quantified bullet: compliance / fraud / analytics delivery]
- [Bullet: SQL / Power BI / Python on engagement]
- [Bullet: stakeholder management — Risk, Legal, Compliance, IT]
- [Bullet: control testing, fraud investigation support, or rule/process improvement]

**Focus areas:** Compliance advisory · Fraud & data analytics · Digital / AI-enabled transformation  
**Industries:** [Financial Services · TMT · Consumer · etc.]

### Education

**B.Sc. Computer Science** — [University] · [Year]

---

## Industry Knowledge (self-study)

| Area | Coverage |
|------|----------|
| Crypto fraud typologies | Onboarding fraud · ATO · bonus abuse · layering · P2P scams |
| Regulatory landscape | FATF · MAS · SFC · Travel Rule (overview) |
| Chain analytics | Entity attribution · mixer exposure · cross-chain flow (conceptual + public-data labs) |

Reference notes: [Fraud typologies cheatsheet](./projects/tm-dashboard/DATA_SCHEMA.md#fraud-typology-mapping) *(in schema doc)*

---

## Languages

| Language | Level |
|----------|-------|
| Chinese | Native |
| English | Professional (consulting & technical) |

---

## Contact

- **Email:** your.email@example.com  
- **LinkedIn:** [linkedin.com/in/YOUR_PROFILE](https://linkedin.com/in/YOUR_PROFILE)  
- **GitHub:** [Huangjw12/data-ai-consulting-portfolio](https://github.com/Huangjw12/data-ai-consulting-portfolio)

---

## Repository Structure

```
portfolio/
├── README.md
├── projects/
│   └── tm-dashboard/
│       ├── DATA_SCHEMA.md          ← field dictionary + KPIs + star schema
│       ├── schema.sql
│       ├── generate_sample_data.py
│       └── data/                   ← generated CSVs (gitignored if large)
├── sql/
├── python/
├── case-studies/
├── power-bi/
│   └── tm-dashboard.pbix           ← (in progress)
├── genai/
└── architecture/
```

---

*Last updated: June 2026 · Synthetic data only · Client names anonymized*
