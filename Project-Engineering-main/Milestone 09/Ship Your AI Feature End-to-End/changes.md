# Changes Made

## Backend Setup

* Created Express backend server
* Added environment variable validation
* Added `/health` route

## AI Integration

* Integrated OpenRouter API
* Added centralized AI service layer
* Added AbortController timeout handling
* Added fallback response handling

## Prompt Engineering

* Created `promptBuilder.js`
* Added structured SYSTEM_PROMPT
* Enforced strict JSON output format

## Middleware

* Added JWT authentication middleware
* Added per-user rate limiting middleware
* Added AI input validation middleware

## Token Usage Tracking

* Added `[AI_USAGE]` logs for every successful AI call
* Logged:

  * timestamp
  * userId
  * model
  * promptTokens
  * completionTokens
  * totalTokens

## Frontend

* Connected frontend only to backend API
* Added environment-based backend URL configuration
* Ensured no API keys exist in frontend

## Deployment

* Deployed backend to Render
* Deployed frontend to Vercel
* Verified live AI endpoint functionality

## Documentation

* Added detailed README.md
* Added COST_ESTIMATE.md with real production token usage
* Added setup instructions and architecture explanation

## Security Verification

* Confirmed API keys are not committed
* Added `.env.example`
* Verified grep checks pass successfully
