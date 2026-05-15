# CHANGES.md

## Security Improvements Applied

This update secures the NoteVault application by removing hardcoded secrets and implementing environment-based configuration management.

---

# Backend Changes

## 1. Secured Database Configuration

### File Updated
`src/config/db.js`

### Changes
- Removed hardcoded PostgreSQL connection string
- Replaced static database URL with:

```js
process.env.DATABASE_URL