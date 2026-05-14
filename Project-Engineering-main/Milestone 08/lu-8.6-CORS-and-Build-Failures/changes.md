# Changes Log - LinkShelf Production Fix

## Task 1: Frontend Environment Variable Fix
- Fixed issue where API base URL was undefined in production
- Ensured `VITE_API_URL` is injected at build time via deployment config (render.yaml)
- Verified frontend uses correct environment variable during Vite build step

## Task 2: Prisma Client Generation Fix
- Added missing build step:
# Changes Log - LinkShelf Production Fix

## Task 1: Frontend Environment Variable Fix
- Fixed issue where API base URL was undefined in production
- Ensured `VITE_API_URL` is injected at build time via deployment config (render.yaml)
- Verified frontend uses correct environment variable during Vite build step
# Changes Log - LinkShelf Production Fix

## Task 1: Frontend Environment Variable Fix
- Fixed issue where API base URL was undefined in production
- Ensured `VITE_API_URL` is injected at build time via deployment config (render.yaml)
- Verified frontend uses correct environment variable during Vite build step


### Network Tab:
- Request URL: `undefined/api/auth/login`
- Status: Failed

---

## ✅ Fix Applied

Ensured environment variable is available during build phase.

### Deployment Fix:
```yaml
buildCommand: npm install && npm run build

This caused complete API failure, meaning login and all backend communication failed.

### Observed behavior:
- Login button did nothing
- Network requests failed immediately
- Console errors showing invalid URL

---

## 🔍 Root Cause

The frontend is built using Vite, which only supports environment variables at **build time**, not runtime.

The issue occurred because:
- `VITE_API_URL` was not properly injected during deployment build
- `import.meta.env.VITE_API_URL` evaluated to `undefined`
- Resulting API base URL became invalid

---

## 🧪 Evidence from Browser DevTools

### Console Error:
## Task 2: Prisma Client Generation Fix
- Added missing build step: