# PL-300 Exam Prep — 21-Day Daily Study Plan

> **Exam:** Microsoft Power BI Data Analyst Associate (PL-300)  
> **Assumed schedule:** Weekdays 1.5h · Weekends 3–4h · Total ~40h over 3 weeks  
> **Prerequisite:** Completed P0 Power BI track (Weeks 1–6 of main study plan)  
> **Pass target:** 700 / 1000

---

## Exam Domain Weight Reference

| Domain | Weight | This plan days |
|--------|--------|----------------|
| Prepare the data | 25–30% | Day 1–4, 15 |
| Model the data | 25–30% | Day 5–7, 16 |
| Visualize the data | 15–20% | Day 8–9 |
| Analyze the data (DAX) | 10–15% | Day 7, 10 |
| Deploy and maintain assets | 10–15% | Day 11–13 |
| Manage workspaces & datasets | 10–15% | Day 14–15 |

---

## Week 1: Domain Deep Dive + Gap Fill

### Day 1 (Mon) — Prepare Data: Get & Transform (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | Module: Get data from various sources (Excel, SQL, web, folders) | [MS Learn PL-300 Path](https://learn.microsoft.com/en-us/training/courses/pl-300t00) |
| Practice | 30m | Import 3 source types into one PBIX; note each connector's quirks | Hands-on |
| Notes | 15m | Write flashcards: DirectQuery vs Import vs Dual; incremental refresh concept | Your notebook |

**Done when:** You can explain when to use each connectivity mode.

---

### Day 2 (Tue) — Prepare Data: Power Query Advanced (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 30m | Parameters, templates, data source credentials | MS Learn |
| Practice | 45m | Build a query with: parameter-driven file path, custom column, conditional split, unpivot | Hands-on |
| Review | 15m | Re-watch Guy in a Cube: "Power Query best practices" (1 video) | YouTube |

**Done when:** You can build a parameterized query without looking at notes.

---

### Day 3 (Wed) — Prepare Data: Data Profiling & Cleaning (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 30m | Column quality, distribution, profiling pane; handling nulls, errors, outliers | MS Learn |
| Practice | 45m | Take messy CSV (mixed dates, nulls, duplicates) → clean to exam-ready | Kaggle dataset |
| Notes | 15m | Document 5 common PQ exam traps (wrong data type, locale issues, etc.) | Flashcards |

**Done when:** Profiling pane used; query folding concept understood.

---

### Day 4 (Thu) — Prepare Data: Exam Traps + Mini Quiz (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Review | 30m | Re-read Days 1–3 notes | |
| Practice | 45m | 15 self-written questions: "What tool for X?" + answer them | Self-quiz |
| Learn | 15m | Star schema preparation in PQ: dimension tables, surrogate keys | MS Learn |

**Done when:** 12/15 self-quiz correct.

---

### Day 5 (Fri) — Model Data: Star Schema & Relationships (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | Star vs snowflake; fact/dimension; cardinality; cross-filter direction | MS Learn + SQLBI "Intro to Data Modeling" |
| Practice | 30m | Build model with: role-playing dimension (Date), inactive relationship, bridge table scenario | Hands-on |
| Notes | 15m | Draw 3 relationship patterns from memory | Paper/draw.io |

**Done when:** You can explain bi-directional filter risks.

---

### Day 6 (Sat) — Model Data: DAX for Modeling (4h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 90m | CALCULATE, context transition, ALL/ALLEXCEPT, USERELATIONSHIP, RELATED | SQLBI Video + MS Learn |
| Practice | 90m | Write 15 measures including: YoY%, % of parent, running total, semi-additive (balance) | Superstore PBIX |
| Review | 30m | Mark measures you got wrong — categorize error type (context, filter, syntax) | Error log |

**Done when:** 12/15 measures work without help.

---

### Day 7 (Sun) — Model Data: Calculation Groups + Time Intelligence (4h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 60m | Time intelligence: DATEADD, SAMEPERIODLASTYEAR, DATESYTD; calculation groups concept | SQLBI |
| Practice | 90m | Add Date dimension; implement 5 time measures; test with slicer | Hands-on |
| Learn | 45m | Field parameters, dynamic measure selection (exam-relevant) | MS Learn / Guy in a Cube |
| Review | 15m | Week 1 checkpoint: list top 5 weak areas | Notion |

**Done when:** Time measures return correct values for 3 different year filters.

---

## Week 2: Visualize + Deploy + Practice Exams

### Day 8 (Mon) — Visualize: Reports & Dashboards (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | Report design: themes, grid, accessibility, mobile layout, custom tooltips | MS Learn |
| Practice | 30m | Build 1 report page following accessibility checklist (alt text, tab order, contrast) | Hands-on |
| Notes | 15m | List all visual types and when to use each (exam loves "best visual for X") | Flashcards |

**Done when:** Mobile layout configured; drill-through page works.

---

### Day 9 (Tue) — Visualize: Interactivity & Performance (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 30m | Bookmarks, buttons, sync slicers, Q&A, performance analyzer | MS Learn |
| Practice | 45m | Add 3 bookmarks + nav buttons; run Performance Analyzer on slow visual | Hands-on |
| Review | 15m | 10 flashcards: "How to reduce report load time?" | Self-made |

**Done when:** Can name 5 performance optimization techniques.

---

### Day 10 (Wed) — Analyze: Advanced DAX + Window Functions (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | RANKX, TOPN, SELECTEDVALUE, HASONEVALUE, DIVIDE, COALESCE; DAX window functions (2024+) | SQLBI / MS docs |
| Practice | 30m | 5 exam-style DAX problems (write measure, predict result) | Self-made or Udemy quiz |
| Review | 15m | Add wrong answers to error log | Error log |

**Done when:** 4/5 DAX prediction problems correct.

---

### Day 11 (Thu) — Deploy: Publish & Manage Assets (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | Publish to Service; datasets vs reports; refresh schedules; gateway types (on-prem, VNet, personal) | MS Learn |
| Learn | 30m | Incremental refresh setup; parameters in service; pipeline deployment (dev/test/prod) | MS Learn |
| Notes | 15m | Draw gateway decision tree: when personal vs standard vs VNet | Notes |

**Done when:** You can explain incremental refresh requirements (RangeStart/RangeEnd, partitions).

---

### Day 12 (Fri) — Deploy: Security & Sensitivity (1.5h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 45m | Row-Level Security (static + dynamic); object-level security; sensitivity labels | MS Learn |
| Practice | 30m | Implement dynamic RLS with USERPRINCIPALNAME() on sample model | Hands-on |
| Notes | 15m | Flashcards: RLS vs OLS; DAX role filter patterns | Flashcards |

**Done when:** Dynamic RLS tested with "View as role".

---

### Day 13 (Sat) — Manage Workspaces + Full Domain Review (4h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Learn | 60m | Workspace roles (Admin/Member/Contributor/Viewer); apps; endorse/certify datasets; scorecards | MS Learn |
| Learn | 45m | Dataflows Gen1 vs Gen2; datamarts; lineage view; impact analysis | MS Learn |
| Review | 90m | Re-read all flashcards; redo weakest 10 from error log | |
| Checkpoint | 15m | Score yourself 1–5 on each of 6 domains | Scorecard below |

**Domain self-score (1=weak, 5=strong):**

| Domain | Score (1–5) |
|--------|-------------|
| Prepare data | |
| Model data | |
| Visualize | |
| Analyze (DAX) | |
| Deploy assets | |
| Manage workspaces | |

---

### Day 14 (Sun) — Practice Exam 1 (4h)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Exam | 120m | Full timed mock: 40–60 questions (simulate 100-min exam pace) | MeasureUp / Udemy PL-300 practice test |
| Review | 90m | Review EVERY wrong answer; tag by domain; re-study weak modules | Error log |
| Plan | 15m | List top 3 domains to focus Days 15–17 | |

**Target:** ≥70% on Practice Exam 1.

---

## Week 3: Mock Exams + Exam Day

### Day 15 (Mon) — Weak Domain Remediation (1.5h)

| Block | Time | Activity |
|-------|------|----------|
| Study | 60m | Focus ONLY on lowest-scoring domain from Day 14 |
| Practice | 30m | 10 targeted questions on that domain |

**Done when:** Can explain 5 concepts from weak domain without notes.

---

### Day 16 (Tue) — Weak Domain #2 + Gateway/RLS Review (1.5h)

| Block | Time | Activity |
|-------|------|----------|
| Study | 45m | Second-weakest domain |
| Review | 30m | Gateway types + RLS patterns (high-frequency exam topics) |
| Flash | 15m | Speed drill: 20 flashcards |

---

### Day 17 (Wed) — Practice Exam 2 (1.5h + optional extra)

| Block | Time | Activity | Resource |
|-------|------|----------|----------|
| Exam | 90m | Second full mock (different question set) | MeasureUp / Udemy |
| Review | 30m | Only review NEW wrong answers (not repeats from Day 14) | Error log |

**Target:** ≥75%. If <70%, delay exam 3–5 days and repeat Days 15–17.

---

### Day 18 (Thu) — Exam Strategy & Hands-On Lab Review (1.5h)

| Block | Time | Activity |
|-------|------|----------|
| Learn | 30m | Read exam format: case study sections, lab tasks, question types | [PL-300 exam page](https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/) |
| Practice | 45m | Timed mini-lab: import → model → 3 measures → 1 report page (45 min limit) |
| Prep | 15m | Prepare exam-day checklist (see below) |

**Exam-day checklist:**
- [ ] Stable internet + quiet room
- [ ] ID ready (if online proctored)
- [ ] Power BI Desktop installed (exam may include lab)
- [ ] No second monitor restrictions checked
- [ ] Booked exam slot: ___________

---

### Day 19 (Fri) — Light Review Only (1.5h)

| Block | Time | Activity |
|-------|------|----------|
| Review | 45m | Flashcards only — no new content |
| Review | 30m | Re-read error log "frequent mistakes" |
| Rest | 15m | Walk through 3-minute "exam confidence" self-talk |

**Rule:** No cramming new topics on Day 19.

---

### Day 20 (Sat) — Practice Exam 3 (Optional) OR Rest (4h or off)

| Option A | 4h mock exam + light review (if scored <75% on Exam 2) |
| Option B | Full rest day — only 30m flashcards (if scored ≥80% on Exam 2) |

---

### Day 21 (Sun/Mon) — EXAM DAY

| Time | Activity |
|------|----------|
| T-60m | Light breakfast; flashcards only |
| T-30m | Login to exam portal; test camera/mic |
| T-0 | Take exam |
| T+1h | Add badge to LinkedIn + Portfolio README |

---

## Error Log Template (use throughout)

```markdown
## PL-300 Error Log

| # | Date | Domain | Question topic | Why I got it wrong | Correct rule to remember |
|---|------|--------|----------------|-------------------|--------------------------|
| 1 | | | | | |
```

---

## High-Frequency Exam Topics Checklist

- [ ] Import vs DirectQuery vs Composite models
- [ ] Query folding — what breaks it
- [ ] Star schema relationship cardinality
- [ ] CALCULATE + context transition
- [ ] Time intelligence (requires Date table)
- [ ] Dynamic RLS with USERPRINCIPALNAME()
- [ ] Gateway types and when each is required
- [ ] Incremental refresh (RangeStart, RangeEnd, partitions)
- [ ] Workspace roles and permissions
- [ ] Certified vs Promoted datasets
- [ ] Performance Analyzer interpretation
- [ ] Deployment pipelines (dev → test → prod)
- [ ] Cross-report drill-through setup
- [ ] Field parameters for dynamic visuals
- [ ] Handling many-to-many relationships

---

## If You Fail — 7-Day Retake Plan

| Day | Focus |
|-----|-------|
| 1–2 | Analyze score report by domain % |
| 3–4 | Deep study on 2 lowest domains |
| 5 | Practice exam (timed) |
| 6 | Hands-on lab simulation |
| 7 | Retake |

---

*Pair with: `notion-daily-notes/D1-D14-learning-notes.md` for study journal during P0 phase.*
