# TM Dashboard

Synthetic transaction monitoring dataset for crypto exchange compliance / fraud ops analytics.

## Quick start

```bash
pip install pandas numpy
python generate_sample_data.py
```

Outputs land in `./data/*.csv`.

## Power BI

1. Get Data → Text/CSV → load all 9 CSV files from `data/`
2. Create relationships per [DATA_SCHEMA.md](./DATA_SCHEMA.md#power-bi-model-notes)
3. Build measures: FP Rate, MTTR, SLA Compliance %, Alert Rate

## Files

| File | Description |
|------|-------------|
| `DATA_SCHEMA.md` | Full field dictionary, KPIs, dashboard mapping |
| `schema.sql` | DDL + analytics views |
| `generate_sample_data.py` | Synthetic data generator |
