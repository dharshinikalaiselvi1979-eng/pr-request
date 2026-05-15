# 📝 Change Log & Performance Metrics

Use this file to document every optimization you make.

## 1. Backend: N+1 Query Fix
- **Baseline**: `X` queries, `Y` ms latency.
- **Fix**: Description of fix.
- **Result**: `Z` queries, `W` ms latency.

## 2. Backend: Pagination
- **Baseline**: 200 items returned.
- **Fix**: Added `page` and `limit`.
- **Result**: `20` items per request.

...and so on.
# Space Mission Logs – Optimization Sprint Changes

## Backend Optimizations

### 1. Fixed N+1 Query Problem
- Replaced multiple Prisma queries inside loops
- Used a single Prisma query with `select`
- Reduced database queries drastically

### 2. Added Pagination
- Implemented `page` and `limit` query parameters
- Added:
  - total
  - totalPages
  - hasNextPage
  - hasPrevPage
- Used Prisma `skip` and `take`

### 3. Removed Over-Fetching
- Trimmed unnecessary fields from API response
- Removed large `description` field from list endpoint
- Returned only:
  - id
  - name
  - launchDate
  - rocket

### 4. Enabled Gzip Compression
- Added Express compression middleware
- Reduced payload transfer size

---

## Frontend Optimizations

### 5. Stabilized Props + React.memo
- Moved inline style object to module-level constant
- Wrapped `MissionCard` with `React.memo`

### 6. Optimized Expensive Filtering
- Wrapped filter/sort logic inside `useMemo`
- Prevented recalculation on every render

### 7. Fixed Double Fetch
- Added `AbortController`
- Passed `signal` to fetch request
- Added cleanup function
- Added dependency array to `useEffect`

### 8. Reduced DOM Load
- Implemented client-side slicing
- Added `Load More` functionality
- Reduced initial render count

### 9. Stabilized Callback Functions
- Wrapped handlers with `useCallback`
- Prevented unnecessary child re-renders

---

## Performance Improvements

### Backend
- Fewer database queries
- Smaller payloads
- Faster API response times

### Frontend
- Faster rendering
- Reduced re-renders
- Smoother search experience
- Lower memory usage

---

## Load Testing
- Added Artillery load testing configuration
- Tested paginated endpoint performance

---

## Deployment
- Optimized application deployed successfully