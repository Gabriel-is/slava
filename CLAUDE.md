# Slava — Project Guidelines

## Project Details
- **Purpose:** AI-powered Ukrainian & Japanese language tutor
- **GitHub:** Gabriel-is/slava

# Session Workflow

## Boot Sequence (every session)
1. `cloud-mcp:boot` — get session ID, bus memory, recent context
2. `cloud-mcp:get_doc barrel.yaml` — load persona, protocols, project registry
3. Check bus memory for anything relevant to the current plan
4. Ask: "SPS for this session?" — load SPS if confirmed

## Development Flow
All code changes follow this order strictly:

1. **Branch** — Always create a feature branch (`feat/`, `fix/`, `refactor/`). Never commit directly to main.
2. **Build** — Write the code
3. **Lint** — Run the project linter before committing (see Linting below)
4. **Test** — Write unit and integration tests. Tests ship with code, no exceptions.
5. **Commit** — Descriptive commit messages explaining the why
6. **Check-in** — When the plan is complete, ask: "Want to add anything before I PR this?"
7. **PR** — When confirmed, push branch and create PR via `gh pr create`
8. **Code Review** — Run `/code-review` on the PR
9. **Fix** — Address any issues scoring over 85
10. **E2E Tests** — Write E2E tests if the change affects user-facing workflows
11. **Merge** — Merge the PR

## Linting
- **When:** After writing code, before every commit. Always before creating a PR.
- **Rule:** Fix all lint errors before committing. Warnings are acceptable only if intentional.
- **Deno projects** (edge functions): `deno lint`
- **JS/TS projects with ESLint:** `npm run lint` or `npx eslint .`
- **JS/TS projects without a linter configured:** Use `npx eslint --no-eslintrc --rule "{no-unused-vars: error, no-undef: error, eqeqeq: error, no-console: warn}" .` for a quick sanity check, or suggest adding ESLint to the project.
- **Python projects:** `ruff check .` (preferred) or `flake8`
- **Don't** introduce new linter dependencies without asking first.

## Testing Protocol
- **Unit tests:** Required for all new functions/modules
- **Integration tests:** Required for cross-system interactions
- **E2E tests:** Required when changes affect user-facing workflows
- Tests are written BEFORE creating the PR, not after
- When touching existing code without tests, add coverage for what you changed
