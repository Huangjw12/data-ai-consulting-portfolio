#!/usr/bin/env python3
"""
Generate synthetic TM dashboard datasets for portfolio use.
All data is fictional. Safe to publish on GitHub.

Usage:
    pip install pandas numpy
    python generate_sample_data.py

Outputs CSV files to ./data/
"""

from __future__ import annotations

import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path

import numpy as np
import pandas as pd

SEED = 42
random.seed(SEED)
np.random.seed(SEED)

OUTPUT_DIR = Path(__file__).parent / "data"
OUTPUT_DIR.mkdir(exist_ok=True)

START_DATE = datetime(2024, 1, 1)
END_DATE = datetime(2025, 6, 30)

COUNTRIES = [
    (1, "SG", "Singapore", "APAC", "Low", 0),
    (2, "HK", "Hong Kong", "APAC", "Low", 0),
    (3, "JP", "Japan", "APAC", "Low", 0),
    (4, "VN", "Vietnam", "APAC", "Medium", 0),
    (5, "PH", "Philippines", "APAC", "Medium", 0),
    (6, "NG", "Nigeria", "EMEA", "High", 0),
    (7, "RU", "Russia", "EMEA", "Prohibited", 1),
    (8, "US", "United States", "AMER", "Low", 0),
    (9, "GB", "United Kingdom", "EMEA", "Low", 0),
    (10, "AE", "United Arab Emirates", "EMEA", "Medium", 0),
]

TYPOLOGIES = [
    (1, "ONB-FRD", "Onboarding Fraud", "Identity", "Synthetic identity at onboarding"),
    (2, "ATO", "Account Takeover", "Account Fraud", "Unauthorized account access"),
    (3, "BONUS-AB", "Bonus / Promotion Abuse", "Platform Abuse", "Referral or bonus farming"),
    (4, "P2P-SCAM", "P2P Scam", "P2P", "P2P payment dispute patterns"),
    (5, "LAYER", "Layering / Structuring", "AML", "Structuring below reporting thresholds"),
    (6, "SAN-HIT", "Sanctions Screening Hit", "Sanctions", "Sanctions list match"),
    (7, "MULE", "Money Mule", "AML", "Pass-through account behavior"),
    (8, "WASH", "Wash Trading", "Market Integrity", "Self-trading patterns"),
    (9, "CARD-FRD", "Fiat On-ramp Fraud", "Payment Fraud", "Card chargeback risk"),
    (10, "DEV-EVA", "Device Evasion", "Identity", "Shared device across accounts"),
    (11, "GEO-EVA", "Geo / VPN Evasion", "Identity", "Geo mismatch vs KYC"),
    (12, "OTHER", "Other / Under Review", "Other", "Unclassified pending review"),
]

RULES = [
    (1, "RULE-TM-001", "High Velocity Withdrawal", "Transaction Monitoring", "Velocity", "High", 5),
    (2, "RULE-TM-002", "New Account Large Withdrawal", "Transaction Monitoring", "Threshold", "High", 7),
    (3, "RULE-KYC-001", "Document Integrity Fail", "KYC", "Pattern", "Medium", 1),
    (4, "RULE-FRD-001", "Login Geo Impossible Travel", "Fraud", "Pattern", "High", 2),
    (5, "RULE-FRD-002", "Bonus Farming Pattern", "Fraud", "Pattern", "Medium", 3),
    (6, "RULE-P2P-001", "P2P Cancel-After-Pay Pattern", "Fraud", "Pattern", "High", 4),
    (7, "RULE-SAN-001", "Sanctions Name Match", "Sanctions", "Pattern", "Critical", 6),
    (8, "RULE-TM-003", "Structuring Below Threshold", "Transaction Monitoring", "Pattern", "Medium", 5),
    (9, "RULE-FRD-003", "Multi-Account Device Link", "Fraud", "Pattern", "High", 10),
    (10, "RULE-TM-004", "High-Risk Country Outflow", "Transaction Monitoring", "Threshold", "High", 5),
]

ANALYSTS = [
    (i, f"ANL-{i:03d}", f"Analyst {chr(64+i)}", team, "APAC", 1)
    for i, team in enumerate(
        ["L1 TM"] * 6 + ["L2 Fraud"] * 5 + ["Compliance"] * 4, start=1
    )
]

TX_TYPES = [
    "Deposit", "Withdrawal", "Spot Trade", "P2P Buy", "P2P Sell",
    "Internal Transfer", "Fiat Deposit", "Fiat Withdrawal",
]
ASSETS = ["BTC", "ETH", "USDT", "BNB", "Fiat-USD"]
CHANNELS = ["On-chain", "Internal", "P2P", "Fiat"]
KYC_TIERS = ["L0", "L1", "L2", "L3"]
ONBOARDING = ["Web", "Mobile App", "P2P Referral", "API"]
DISPOSITIONS_CLOSED = ["True Positive", "False Positive", "Unable to Disprove", "Escalated to L2"]
PRIORITIES = ["Low", "Medium", "High"]
SLA_BY_PRIORITY = {"Low": 72, "Medium": 48, "High": 24}


def date_range(start: datetime, end: datetime) -> list[datetime]:
    days = (end - start).days + 1
    return [start + timedelta(days=i) for i in range(days)]


def build_dim_date() -> pd.DataFrame:
    rows = []
    for d in date_range(START_DATE, END_DATE):
        rows.append({
            "date_key": int(d.strftime("%Y%m%d")),
            "full_date": d.strftime("%Y-%m-%d"),
            "year": d.year,
            "quarter": (d.month - 1) // 3 + 1,
            "month": d.month,
            "month_name": d.strftime("%B"),
            "week_of_year": d.isocalendar()[1],
            "day_of_week": d.isoweekday(),
            "is_weekend": 1 if d.isoweekday() >= 6 else 0,
        })
    return pd.DataFrame(rows)


def build_dim_country() -> pd.DataFrame:
    cols = ["country_key", "country_code", "country_name", "region", "risk_tier", "is_sanctioned"]
    return pd.DataFrame(COUNTRIES, columns=cols)


def build_dim_typology() -> pd.DataFrame:
    cols = ["typology_key", "typology_code", "typology_name", "typology_group", "description"]
    return pd.DataFrame(TYPOLOGIES, columns=cols)


def build_dim_rule() -> pd.DataFrame:
    rows = []
    for rule_key, rule_id, name, cat, rtype, sev, typo_key in RULES:
        rows.append({
            "rule_key": rule_key,
            "rule_id": rule_id,
            "rule_name": name,
            "rule_category": cat,
            "rule_type": rtype,
            "severity_default": sev,
            "is_active": 1,
            "owner_team": "TM Ops" if cat == "Transaction Monitoring" else ("Fraud" if cat == "Fraud" else "Compliance"),
            "last_tuned_date": (START_DATE + timedelta(days=random.randint(0, 300))).strftime("%Y-%m-%d"),
        })
    return pd.DataFrame(rows)


def build_dim_analyst() -> pd.DataFrame:
    cols = ["analyst_key", "analyst_id", "analyst_name", "team", "region", "is_active"]
    return pd.DataFrame(ANALYSTS, columns=cols)


def build_dim_user(n_users: int = 5000) -> pd.DataFrame:
    country_keys = [c[0] for c in COUNTRIES]
    weights = [0.25, 0.15, 0.1, 0.12, 0.1, 0.08, 0.02, 0.08, 0.05, 0.05]
    rows = []
    for i in range(1, n_users + 1):
        ck = random.choices(country_keys, weights=weights)[0]
        tier = random.choices(KYC_TIERS, weights=[0.05, 0.15, 0.65, 0.15])[0]
        reg_days_ago = random.randint(1, 540)
        rows.append({
            "user_key": i,
            "user_id": f"USR-{uuid.uuid4().hex[:8].upper()}",
            "country_key": ck,
            "kyc_tier": tier,
            "kyc_status": random.choices(["Approved", "Pending", "Rejected", "Expired"], weights=[0.85, 0.08, 0.05, 0.02])[0],
            "onboarding_channel": random.choice(ONBOARDING),
            "account_age_days": reg_days_ago,
            "is_pep": 1 if random.random() < 0.01 else 0,
            "is_high_risk_occupation": 1 if random.random() < 0.03 else 0,
            "device_risk_score": round(random.uniform(5, 95), 2),
            "first_deposit_date": (END_DATE - timedelta(days=random.randint(0, reg_days_ago))).strftime("%Y-%m-%d"),
            "is_active_30d": 1 if random.random() < 0.55 else 0,
        })
    return pd.DataFrame(rows)


def build_fact_transaction(users: pd.DataFrame, dates: pd.DataFrame, n_tx: int = 200_000) -> pd.DataFrame:
    date_keys = dates["date_key"].tolist()
    user_keys = users["user_key"].tolist()
    rows = []
    for _ in range(n_tx):
        dk = random.choice(date_keys)
        uk = random.choice(user_keys)
        day = datetime.strptime(str(dk), "%Y%m%d")
        ts = day + timedelta(
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59),
            seconds=random.randint(0, 59),
        )
        tx_type = random.choices(TX_TYPES, weights=[0.2, 0.18, 0.25, 0.08, 0.08, 0.1, 0.06, 0.05])[0]
        amount_usd = round(max(1, np.random.lognormal(mean=4, sigma=1.5)), 2)
        rows.append({
            "transaction_id": f"TX-{uuid.uuid4().hex[:8].upper()}",
            "tx_date_key": dk,
            "user_key": uk,
            "tx_timestamp": ts.strftime("%Y-%m-%d %H:%M:%S"),
            "tx_type": tx_type,
            "asset": random.choice(ASSETS),
            "amount": amount_usd,
            "amount_usd": amount_usd,
            "channel": "P2P" if "P2P" in tx_type else random.choice(CHANNELS),
            "counterparty_risk_score": round(random.uniform(0, 100), 2),
            "is_successful": 1 if random.random() < 0.97 else 0,
            "failure_reason": None if random.random() < 0.97 else random.choice(["Limit Exceeded", "Risk Block", "KYC Required"]),
            "ip_country_code": random.choice([c[1] for c in COUNTRIES]),
            "device_id_hash": f"DEV-{uuid.uuid4().hex[:6].upper()}",
        })
    return pd.DataFrame(rows)


def pick_disposition(rule_key: int, rng: random.Random | None = None) -> str:
    r = rng or random
    fraud_rules = {4, 5, 6, 9}
    if rule_key in fraud_rules:
        return r.choices(DISPOSITIONS_CLOSED, weights=[0.35, 0.45, 0.12, 0.08])[0]
    return r.choices(DISPOSITIONS_CLOSED, weights=[0.18, 0.68, 0.09, 0.05])[0]


def random_alert_datetime(date_keys: list[int]) -> tuple[int, str]:
    dk = random.choice(date_keys)
    day = datetime.strptime(str(dk), "%Y%m%d")
    ts = day + timedelta(
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )
    return dk, ts.strftime("%Y-%m-%d %H:%M:%S")


def build_fact_alert_and_case(
    users: pd.DataFrame,
    transactions: pd.DataFrame,
    date_keys: list[int],
    n_alerts: int = 8000,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    user_keys = users["user_key"].tolist()
    tx_sample = transactions.sample(n=min(len(transactions), 50000), random_state=SEED)
    tx_by_user = tx_sample.groupby("user_key").head(3).reset_index(drop=True)

    alerts = []
    cases = []
    case_counter = 1

    for i in range(n_alerts):
        rule_key, _, _, _, _, _, typo_key = random.choice(RULES)
        user_key = random.choice(user_keys)
        linked_tx = None
        if random.random() < 0.75 and not tx_by_user.empty:
            user_tx = tx_by_user[tx_by_user["user_key"] == user_key]
            if not user_tx.empty:
                row = user_tx.sample(1).iloc[0]
                alert_date_key = int(row["tx_date_key"])
                alert_ts = row["tx_timestamp"]
                linked_tx = row["transaction_id"]
            else:
                alert_date_key, alert_ts = random_alert_datetime(date_keys)
        else:
            alert_date_key, alert_ts = random_alert_datetime(date_keys)

        severity = random.choice(["Low", "Medium", "High", "Critical"])
        alert_status = random.choices(["Open", "In Review", "Closed", "Escalated"], weights=[0.08, 0.12, 0.75, 0.05])[0]

        if alert_status in ("Open", "In Review"):
            disposition = "Pending"
            disposition_date_key = None
            ttd_hours = None
            case_id = None
        else:
            disposition = pick_disposition(rule_key)
            ttd_hours = round(random.uniform(2, 96), 2)
            disp_day = datetime.strptime(alert_ts, "%Y-%m-%d %H:%M:%S") + timedelta(hours=ttd_hours)
            disposition_date_key = int(disp_day.strftime("%Y%m%d"))

            if random.random() < 0.55:
                case_id = f"CASE-{case_counter:05d}"
                case_counter += 1
                priority = random.choices(PRIORITIES, weights=[0.3, 0.45, 0.25])[0]
                sla = SLA_BY_PRIORITY[priority]
                close_hours = round(random.uniform(6, sla * 1.8), 2)
                close_day = datetime.strptime(alert_ts, "%Y-%m-%d %H:%M:%S") + timedelta(hours=close_hours)
                sar = disposition == "True Positive" and random.random() < 0.15
                cases.append({
                    "case_id": case_id,
                    "open_date_key": alert_date_key,
                    "close_date_key": int(close_day.strftime("%Y%m%d")),
                    "user_key": user_key,
                    "primary_typology_key": typo_key,
                    "analyst_key": random.randint(1, len(ANALYSTS)),
                    "case_status": "Escalated SAR" if sar else "Closed",
                    "case_priority": priority,
                    "case_outcome": "SAR Filed" if sar else disposition,
                    "linked_alert_count": random.randint(1, 3),
                    "time_to_close_hours": close_hours,
                    "sla_hours": sla,
                    "is_sla_breached": 1 if close_hours > sla else 0,
                    "sar_filed": 1 if sar else 0,
                    "loss_prevented_usd": round(random.uniform(0, 50000), 2) if disposition == "True Positive" else 0,
                    "investigation_notes": random.choice([
                        "Device fingerprint mismatch vs historical pattern.",
                        "Velocity spike after new device login.",
                        "P2P counterparty linked to prior scam reports.",
                        "KYC document metadata inconsistency flagged.",
                        "Withdrawal to high-risk corridor within 24h of deposit.",
                    ]),
                })
            else:
                case_id = None

        alerts.append({
            "alert_id": f"ALT-{alert_date_key}-{i+1:05d}",
            "alert_date_key": alert_date_key,
            "alert_timestamp": alert_ts,
            "user_key": user_key,
            "rule_key": rule_key,
            "typology_key": typo_key,
            "transaction_id": linked_tx,
            "severity": severity,
            "alert_score": round(random.uniform(40, 99), 2),
            "alert_status": alert_status,
            "disposition": disposition,
            "disposition_date_key": disposition_date_key,
            "case_id": case_id,
            "time_to_disposition_hours": ttd_hours,
            "is_sar_candidate": 1 if disposition == "True Positive" and random.random() < 0.25 else 0,
            "analyst_l1_key": random.randint(1, 6) if alert_status != "Open" else None,
        })

    return pd.DataFrame(alerts), pd.DataFrame(cases)


def main() -> None:
    print("Generating synthetic TM dashboard data...")
    dim_date = build_dim_date()
    dim_country = build_dim_country()
    dim_typology = build_dim_typology()
    dim_rule = build_dim_rule()
    dim_analyst = build_dim_analyst()
    dim_user = build_dim_user()
    fact_transaction = build_fact_transaction(dim_user, dim_date)
    date_keys = dim_date["date_key"].tolist()
    fact_alert, fact_case = build_fact_alert_and_case(dim_user, fact_transaction, date_keys)

    files = {
        "dim_date.csv": dim_date,
        "dim_country.csv": dim_country,
        "dim_user.csv": dim_user,
        "dim_rule.csv": dim_rule,
        "dim_typology.csv": dim_typology,
        "dim_analyst.csv": dim_analyst,
        "fact_transaction.csv": fact_transaction,
        "fact_alert.csv": fact_alert,
        "fact_case.csv": fact_case,
    }

    for name, df in files.items():
        path = OUTPUT_DIR / name
        df.to_csv(path, index=False)
        print(f"  wrote {path} ({len(df):,} rows)")

    fp_rate = (fact_alert["disposition"] == "False Positive").mean()
    print(f"\nDone. False positive rate: {fp_rate:.1%}")
    print("Next: Import CSVs into Power BI → see DATA_SCHEMA.md for relationships.")


if __name__ == "__main__":
    main()
