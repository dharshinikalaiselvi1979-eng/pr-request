# Changes Made — JobScan AI Production Guardrails

## Phase 1 — Failure Reproduction

### Failure 1 — Unlimited Input Length
Observed that the API accepted a 5000+ character payload and still called the AI service successfully.

Issue:
- No validation existed before calling OpenRouter.
- Large payloads unnecessarily consumed tokens and increased cost.

Observed behavior:
- Request succeeded.
- AI response returned.
- [AI_USAGE] log appeared in terminal.

---

### Failure 2 — Indefinite Hang
Added a temporary 60-second artificial delay before the OpenRouter fetch call.

Observed behavior:
- Request hung for ~60 seconds.
- Connection stayed open with no timeout protection.
- Server thread remained occupied.

---

### Failure 3 — Server Crash on LLM Error
Replaced the API key with an invalid key.

Observed behavior:
- OpenRouter request failed.
- Unhandled exception caused server crash.
- /health endpoint stopped responding.

---

# Guardrails Added

## Guardrail 1 — Input Length Validation

### File Modified
src/controllers/analyzeController.js

### Added
- Empty input validation
- Maximum length validation (3000 chars)

### Response Shapes
```js
{
  error: 'input_required',
  message: 'Job description text is required.'
}