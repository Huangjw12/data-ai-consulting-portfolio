# Crypto Exchange Fraud Typologies — Cheatsheet

> Map each typology → data signals → typical rule → your Deloitte parallel (fill in).

| Code | Typology | Data signals | Example rule | Interview one-liner |
|------|----------|--------------|--------------|---------------------|
| ONB-FRD | Onboarding fraud | Doc metadata mismatch; device reuse; velocity signup | KYC doc integrity fail | Fake identity at registration |
| ATO | Account takeover | New device + geo jump + pwd reset + withdrawal | Impossible travel login | Stolen account cash-out |
| BONUS-AB | Bonus / referral abuse | Multi-account device graph; referral rings | Bonus farming pattern | Promotion abuse rings |
| P2P-SCAM | P2P scam | Cancel-after-pay; dispute spike; new seller burst | P2P behavioral anomaly | Off-platform payment fraud |
| LAYER | Layering / structuring | Many small tx; just-below thresholds | Structuring detector | AML layering on exchange |
| MULE | Money mule | In → quick out; low balance history | New acct large pass-through | Pass-through accounts |
| SAN-HIT | Sanctions hit | Name/wallet on SDN list | Sanctions screening | OFAC/list match |
| WASH | Wash trading | Self-trade patterns; zero economic intent | Wash trade graph | Market integrity |
| CARD-FRD | Fiat on-ramp fraud | Chargebacks; card BIN risk | Card fraud score | Stolen card deposits |
| DEV-EVA | Device evasion | Same device, many accounts | Device fingerprint link | Multi-account abuse |
| GEO-EVA | Geo / VPN evasion | IP vs KYC country mismatch | Geo anomaly | Location spoofing |

## Investigation questions (any typology)

1. What is the **customer journey** in the last 72 hours?  
2. What **rules** fired and in what order?  
3. Is there **prior history** (chargebacks, disputes, prior FP)?  
4. **Counterparties** — linked wallets, P2P merchants, device IDs?  
5. **Disposition** — close, escalate L2, or SAR?

## Crypto translation from TradFi (interview)

| TradFi (Deloitte) | Crypto exchange |
|-----------------|-----------------|
| Payment fraud | Fiat on-ramp + P2P |
| Application fraud | KYC onboarding |
| Account fraud | ATO + mule |
| AML monitoring | TM + chain analytics |
| SAR | STR to FIU |

Fill your row: *"At Deloitte I worked on [X], which maps to [typology] because…"*
