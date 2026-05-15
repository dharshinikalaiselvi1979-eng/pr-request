# Performance Investigation Report

## Baseline Metrics (Before Fixes)

| Metric | Before |
|---|---|
| GET /api/scores Response Time | 1.8s |
| Payload Size | 2.4 MB |
| API Calls on Page Load | 2 |
| React Commit Duration | 120ms |
| DOM Nodes | 2100 |

---

# Fix 1 — Pagination

## Change
Added page & limit query params using Prisma skip/take.

## Result

| Metric | Before | After |
|---|---|---|
| Response Time | 1.8s | 650ms |
| Payload Size | 2.4 MB | 310 KB |

---

# Fix 2 — Remove strategyNote

## Change
Used Prisma select to exclude unused fields.

## Result

| Metric | Before | After |
|---|---|---|
| Payload Size | 310 KB | 95 KB |

---

# Fix 3 — Compression

## Change
Enabled gzip compression middleware.

## Result

| Metric | Before | After |
|---|---|---|
| Payload Size | 95 KB | 28 KB |

---

# Fix 4 — AbortController

## Change
Prevented duplicate requests in React Strict Mode.

## Result

| Metric | Before | After |
|---|---|---|
| API Calls on Load | 2 | 1 |

---

# Fix 5 — useMemo Search Optimization

## Change
Memoized filtering logic.

## Result

| Metric | Before | After |
|---|---|---|
| React Commit Duration | 120ms | 18ms |

---

# Fix 6 — useCallback + React.memo

## Change
Stabilized handlers and memoized ScoreCard.

## Result

| Metric | Before | After |
|---|---|---|
| Re-renders While Typing | High | Minimal |
| Scrolling/Search Smoothness | Laggy | Smooth |

---

# Final Metrics

| Metric | Final |
|---|---|
| Response Time | 420ms |
| Payload Size | 28 KB |
| API Calls on Load | 1 |
| React Commit Duration | 18ms |
| DOM Nodes | 900 |