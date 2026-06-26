# Project 02 — On-Chain AML Explorer

**Status:** ⚪ Planned (Target: Aug 2026)

## Objective

Demonstrate understanding of **blockchain analytics workflows** using **public data only** — no Chainalysis license required for portfolio.

## Planned deliverables

| # | Deliverable |
|---|-------------|
| 1 | Python script: input wallet → risk flags + tx summary |
| 2 | Sample investigation note (1 page PDF) |
| 3 | README walkthrough with Etherscan screenshots |

## Data sources (public)

- [Etherscan API](https://docs.etherscan.io/)
- [OFAC SDN crypto addresses](https://ofac.treasury.gov/)
- [Chainabuse](https://www.chainabuse.com/) (reference)

## Risk flags (planned logic)

| Flag | Signal |
|------|--------|
| Sanctions exposure | Counterparty in SDN list |
| High velocity | N txs in 24h > threshold |
| Mixer proximity | Known mixer address in path (manual seed list) |
| New wallet burst | Young wallet + large inflow |

## Interview line

> "I traced a public OFAC-tagged address using Etherscan and documented the funds-flow narrative — same workflow as KYT escalation, at portfolio scale."

## Folder structure (when built)

```
02-onchain-aml-explorer/
├── README.md
├── requirements.txt
├── trace_wallet.py
├── data/
│   └── sanctions_seed.csv
└── samples/
    └── investigation-note-example.md
```
