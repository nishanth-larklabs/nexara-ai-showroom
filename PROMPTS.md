# Instructions — DriveAI Build System

## Identity

You are a senior frontend engineer and AI integration specialist.
Your job is to build the DriveAI project described in TASK.md, one
feature at a time, committing after every completed feature.

---

## 0. Before anything else

1. Read `TASK.md` completely.
2. Read `.agent/skills/senior-frontend` (or whichever skill file lives in
   `.agent/`). Treat it as law for every component you write.
3. Build a mental checklist of every distinct feature in TASK.md.
   Do NOT start coding until you have that list.

---

## 1. Iteration loop — repeat until all features are done

For each feature, follow these steps IN ORDER. Do not skip or merge steps.

### Step 1 — Pick the smallest shippable unit

- Choose the next unchecked feature from your list.
- If a feature is large, break it into the smallest piece that can be
  committed and tested on its own (e.g. "hero section markup" before
  "hero section animation").
- State out loud what you are about to build before writing any code.

### Step 2 — Re-read the relevant skill rules

- Before writing a single line, re-read any section of the skill file
  that applies to this feature (layout, animation, AI integration, etc.).
- If the skill file conflicts with something you were about to do,
  the skill file wins.

### Step 3 — Implement

Hard rules that apply to every file you touch:

#### Imports and packages

- Use the latest stable version of every package.
- Zero deprecated APIs. Before using any API, confirm it is not
  deprecated in the current major version. Examples to avoid:
  - ReactDOM.render → use createRoot
  - componentDidMount → use hooks
  - `String.prototype.substr` → use `slice`
  - `findDOMNode` → use refs
  - Any Groq SDK method marked deprecated in its changelog
- If you are unsure whether something is deprecated, treat it as
  deprecated and find the modern equivalent.

#### AI assistant behaviour

- The assistant must perform THREE things on every query:
  1. Scroll to the relevant section (smooth, using `scrollIntoView`
     or equivalent — no `window.scrollTo` magic numbers).
  2. Mutate page state (filter, pre-fill, swap content, etc.).
  3. Reply in natural language.
- These must happen together, driven by a single structured response
  from the LLM (use a JSON tool-call / function-call schema, not
  free-text parsing).
- At least six distinct query types must produce meaningfully different
  page mutations (not just different scroll targets).

#### Code quality

- TypeScript strict mode if the project uses TS; otherwise JSDoc types.
- No `any` types without a comment explaining why.
- Components are single-responsibility. If a file exceeds ~200 lines,
  split it.
- CSS: use CSS custom properties for every repeated value (colors,
  spacing, radii). No magic numbers inline.
- Accessibility: every interactive element has an accessible label.
  The booking form passes basic ARIA requirements.
- No `console.log` left in committed code (use a `debug` flag instead).

### Step 4 — Evaluate before committing

Before you commit, check every item below. If any item fails,
fix it and re-evaluate.

```
EVALUATION CHECKLIST
[ ] The feature works end-to-end in a browser (no console errors).
[ ] No deprecated API is used anywhere in the diff.
[ ] The Groq wrapper is used — no raw fetch to api.groq.com in
    component code.
[ ] The AI assistant mutates the page, not just the chat panel.
[ ] The skill file rules are respected (layout, spacing, motion, etc.).
[ ] No hardcoded secrets or API keys.
[ ] The code is readable — a teammate could maintain this.
[ ] TypeScript (if used) compiles with zero errors.
```

### Step 5 — Commit

- Stage only the files changed for this feature.
- Commit message format:
  `feat(<scope>): <what was built>`
  Examples:
  - `feat(hero): add hero section with animated tagline`
  - `feat(ai): implement scroll+mutate+reply on query`
  - `feat(booking): pre-fill form from AI assistant response`
- One commit per feature. Do not batch multiple features into one commit.
- After committing, check the feature off your mental list.

### Step 6 — Proceed to the next feature

- Do not start the next feature until the current one is committed.
- Repeat from Step 1.

---

## 2. What "latest approach" means in practice

| Do this                                          | Not this                          |
| ------------------------------------------------ | --------------------------------- |
| `import { Groq } from 'groq-sdk'`                | raw `fetch` to Groq endpoint      |
| `createRoot(container).render(...)`              | `ReactDOM.render(...)`            |
| `useEffect` + `useRef`                           | `componentDidMount`               |
| `element.scrollIntoView({ behavior: 'smooth' })` | `window.scrollTo` with pixel math |
| CSS `clamp()` for fluid type                     | fixed `px` breakpoints            |
| `vite` or `next` (latest)                        | CRA (`create-react-app`)          |
| `fetch` with `AbortController` for timeouts      | unguarded `fetch`                 |
| Structured LLM output (tool calls / JSON mode)   | regex parsing of freeform text    |

---

## 3. Groq structured output schema (use this exactly)

The LLM must return a JSON object on every query. Define this as
a Groq tool call schema in your wrapper:

```json
{
  "name": "navigate_and_mutate",
  "description": "Navigate the page and mutate content in response to a user query",
  "parameters": {
    "type": "object",
    "required": ["section", "mutation", "reply"],
    "properties": {
      "section": {
        "type": "string",
        "enum": [
          "hero",
          "models",
          "features",
          "comparison",
          "pricing",
          "booking",
          "contact"
        ],
        "description": "The page section to scroll to"
      },
      "mutation": {
        "type": "object",
        "required": ["type"],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "filter_models",
              "compare_models",
              "prefill_booking",
              "highlight_model",
              "change_currency",
              "show_feature",
              "reset"
            ]
          },
          "payload": {
            "type": "object",
            "description": "Mutation-specific data (e.g. filters, model IDs, form values)"
          }
        }
      },
      "reply": {
        "type": "string",
        "description": "Natural-language reply shown in the chat panel"
      }
    }
  }
}
```

Your frontend reads `mutation.type` and dispatches to the correct
page handler. Every `mutation.type` enum value corresponds to one of
the six required distinct query types.

---

## 4. Things you must never do

- Never commit a working feature and an unrelated refactor in the
  same commit.
- Never use a package version older than the current major release.
- Never leave a TODO comment in committed code without a GitHub issue
  reference.
- Never make the AI assistant reply only in text without also mutating
  the page.
- Never use `eval`, `innerHTML` with unsanitised input, or `dangerouslySetInnerHTML`
  unless the input is from your own static data.
- Never spend money. If any service prompts for a credit card,
  stop and choose a free alternative.

---

## 5. Done criteria

The project is complete when:

- [ ] All sections from TASK.md are present and functional.
- [ ] At least six distinct query → mutation paths work end-to-end.
- [ ] The live URL opens in a fresh browser with no console errors.
- [ ] `README.md` are fully written.
- [ ] Git log shows one commit per feature with descriptive messages.
- [ ] No deprecated API appears anywhere in the codebase.

============================== DESIGN PROMPT ===========================

See the attached images for design inspiration and use them to understand and learn the UI/UX style shown in them

fully understand the design step by step

just understand design very deeply do not provide me any code 

redesign the full codebase with that reference image previously i gave it you with these non-negotiable constraints:

DESIGN BRIEF:

- This must feel EMOTIONALLY POSITIVE and genuinely delightful to interact with
- It must be ADDICTIVE — micro-interactions, satisfying feedback, motion that rewards attention
- It must reflect SENIOR PRODUCT DESIGN — intentional hierarchy, deliberate whitespace, nothing generic
- Every hover, click, and transition must feel considered
- Typography must be distinctive — NO Inter, Roboto, Arial, or Space Grotesk
- Color palette must have a dominant personality — no timid, evenly-distributed neutrals
- I do not want the dark theme

CRITICAL: Do NOT modify any existing business logic, data flow, state management, API calls, or functional behavior. This is a VISUAL redesign only — change only styles, layout, typography, colors, animations, and presentation layer. All existing functions, handlers, hooks, and logic must remain exactly as-is.

WHAT TO AVOID:

- Purple gradients on white
- Generic card grids with rounded corners and subtle shadows
- Predictable layout patterns
- Motion that is decorative but not meaningful
- Anything that looks like it came from a Tailwind UI template

Show your aesthetic direction choice and reasoning BEFORE coding.
