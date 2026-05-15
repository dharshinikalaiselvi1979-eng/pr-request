// prompts/rewritten.js

// ======================================================
// Task A — Notes Reviewer
// ======================================================

export const TASK_A_PROMPT = (content) => ({
  
  // 1. SYSTEM INSTRUCTION
  systemMsg: `
You are NoteReview AI, an expert academic notes evaluator.

Your responsibility is to analyse student notes and return structured JSON output
that can be directly consumed by a frontend application.
`,

  // 2. CONTEXT
  // 3. TASK
  // 4. FORMAT
  // 5. CONSTRAINTS
  userMsg: `
Review the following study notes.

--- NOTE START ---
${content}
--- NOTE END ---

Task:
Evaluate the notes based on:
1. clarity
2. completeness
3. accuracy

For each category:
- provide a score out of 10
- provide concise feedback

Also provide:
- overallScore
- topPriority improvement suggestion

Return ONLY valid JSON in this exact structure:

{
  "clarity": {
    "score": 0,
    "feedback": ""
  },
  "completeness": {
    "score": 0,
    "feedback": ""
  },
  "accuracy": {
    "score": 0,
    "feedback": ""
  },
  "overallScore": 0,
  "topPriority": ""
}

Constraints:
- Do not use markdown
- Do not wrap JSON in code fences
- Do not invent facts not present in the notes
- Do not add extra fields
- Keep feedback concise and professional
`
})

// ======================================================
// Task B — Placement Summariser
// ======================================================

export const TASK_B_PROMPT = (text) => ({

  // 1. SYSTEM INSTRUCTION
  systemMsg: `
You are InterviewSummary AI, a privacy-safe interview experience summariser.

Your task is to extract structured interview insights while avoiding personal or sensitive information.
`,

  // 2. CONTEXT
  // 3. TASK
  // 4. FORMAT
  // 5. CONSTRAINTS
  userMsg: `
Summarise the following interview experience.

--- INTERVIEW EXPERIENCE START ---
${text}
--- INTERVIEW EXPERIENCE END ---

Extract the following:
- company
- role
- difficulty
- keyTopics
- outcome

Return ONLY valid JSON in this exact structure:

{
  "company": "",
  "role": "",
  "difficulty": 1,
  "keyTopics": [],
  "outcome": ""
}

Rules:
- difficulty must be a number from 1 to 5
- keyTopics must be an array of strings
- outcome must be one concise sentence

Constraints:
- Do not include personal names
- Do not speculate beyond the provided text
- Do not use markdown
- Do not wrap JSON in code fences
- Do not add extra fields
`
})

// ======================================================
// Task C — Error Analyst
// ======================================================

export const TASK_C_PROMPT = (error_message) => ({

  // 1. SYSTEM INSTRUCTION
  systemMsg: `
You are a senior backend debugging engineer.

Your job is to analyse software error logs and return structured diagnostics for a developer dashboard.
`,

  // 2. CONTEXT
  // 3. TASK
  // 4. FORMAT
  // 5. CONSTRAINTS
  userMsg: `
Analyse the following error log.

--- ERROR LOG START ---
${error_message}
--- ERROR LOG END ---

Identify:
- rootCause
- affectedComponent
- severity
- recommendedFix

Optionally include:
- codeSnippet

Return ONLY valid JSON in this exact structure:

{
  "rootCause": "",
  "affectedComponent": "",
  "severity": "low",
  "recommendedFix": "",
  "codeSnippet": ""
}

Severity Rules:
- severity must be exactly one of:
  "low"
  "medium"
  "high"
  "critical"

Constraints:
- Do not use markdown
- Do not wrap JSON in code fences
- Do not speculate about unsupported causes
- Keep explanations concise
- Do not add extra fields
`
})