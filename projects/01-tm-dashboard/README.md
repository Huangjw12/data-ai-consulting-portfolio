# Transaction Monitoring Dashboard

Synthetic **crypto exchange** TM dataset for Power BI + SQL portfolio.

## Quick start

```bash
pip install pandas numpy
python generate_sample_data.py
```

Outputs: `data/*.csv` (gitignored — regenerate locally)

## Docs

- [DATA_SCHEMA.md](./DATA_SCHEMA.md) — fields, KPIs, PBI relationships
- [schema.sql](./schema.sql) — DDL + views

## Dashboard pages

1. Ops Overview  
2. Rule Health  
3. Geo & KYC  
4. Case Management  

Save `.pbix` here when complete. Add screenshots to [`../../assets/screenshots/`](../../assets/screenshots/).
