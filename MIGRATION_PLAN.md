# Rapport CRM — Next.js Migration Plan

## 1. Goal

Migrate the existing mirrored CRM frontend into a maintainable Next.js App Router codebase **without sacrificing its current UI, visual details, or animation quality**.

The migration is deliberately incremental. The current frontend is the visual and behavioral reference. Early phases focus on structure and mock data only; APIs, authentication, and persistent backend data are out of scope until the migrated UI is stable.

## 2. Principles and guardrails

### UI and motion are first-class requirements

- Treat visual parity as a release requirement, not a nice-to-have.
- Do not redesign, simplify, or remove animations just to make the migration easier.
- Record animation triggers, duration, delay, easing, stagger order, hover/focus states, loading transitions, and exit behavior where present.
- Preserve responsive behavior, typography, spacing, borders, shadows, gradients, icons, chart styling, and empty/loading states.
- Respect `prefers-reduced-motion` if the current UI supports it; do not introduce motion that violates an existing reduced-motion behavior.
- Do not replace existing CSS wholesale with Tailwind or a component library during the parity pass. Reuse and organize the existing CSS first; reconsider styling tooling only in a separate, deliberate decision.

### Migration safety

- Keep the original mirrored frontend untouched as a reference.
- Work in a branch and commit after each completed phase.
- Migrate one layer or page at a time.
- Avoid combining framework migration, visual redesign, and backend implementation in one change.
- Prefer small reversible changes over a big-bang rewrite.
- If a page fails the visual or interaction checks, fix that page before moving on.

### Data and backend scope

- Use local mock data and component state for the shell and page migrations.
- Create typed data models/interfaces early so mock data can later be replaced behind a data-access layer.
- Do not build API routes, connect a database, or add authentication during the initial UI migration phases.
- Do not fake backend readiness: label mock actions/data clearly in code and document which behaviors are not persistent.

## 3. Proposed target structure

This is a proposed destination, not a claim about the existing files. Adjust it as the migration reveals actual component boundaries.

```text
rapport-next/
├── public/
│   ├── images/                    # Existing portrait and other static images
│   └── favicon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root document/layout and global providers
│   │   ├── page.tsx                # Overview route
│   │   ├── globals.css
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx       # Only if customer detail view is in scope
│   │   ├── pipeline/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── schedule/page.tsx
│   │   ├── finance/page.tsx
│   │   ├── growth/page.tsx
│   │   └── settings/page.tsx
│   ├── components/
│   │   ├── layout/                 # App shell, header, sidebar/nav, quick actions
│   │   ├── ui/                     # Reusable buttons, cards, dialogs, inputs, etc.
│   │   ├── overview/
│   │   ├── customers/
│   │   ├── pipeline/
│   │   ├── projects/
│   │   ├── schedule/
│   │   ├── finance/
│   │   └── growth/
│   ├── data/                       # Mock records and fixtures
│   ├── lib/                        # Helpers and shared utilities
│   └── types/                      # Shared TypeScript types
├── tests/                           # Add appropriate visual/interaction tests
├── README.md
└── MIGRATION_PLAN.md
```

Keep the first version as simple as possible. Do not create empty folders or abstractions just to match this tree. Add a folder when real code needs it.

## 4. Phases and exit gates

A phase is complete only when its exit criteria are met. If a phase fails its gate, remain in that phase and fix the differences before continuing.

### Phase 0 — Baseline and inventory

**Purpose:** Understand what must be preserved before touching the implementation.

Tasks:
- Run the original frontend and verify all current routes.
- Record the supported viewport sizes and responsive breakpoints.
- Capture screenshots of every page in representative states.
- Capture interaction references for navigation, menus, modals, hover states, forms, filters, checkboxes, charts, and other visible controls.
- Inventory animations and transitions: trigger, element, duration/easing if discoverable, and expected end state.
- Record which controls work, which are mock-only, and which are placeholders.
- Identify asset references, fonts, icons, chart implementation, theme behavior, and local-storage usage.
- Keep an untouched copy and confirm it still runs.

Deliverables:
- `docs/ui-inventory.md`
- `docs/animation-inventory.md`
- Baseline screenshots (organized by route and viewport)
- A list of known existing bugs/placeholders, clearly separated from migration regressions

**Exit gate:** Every in-scope page has a baseline and a known list of important interactions/motion. The original remains runnable.

### Phase 1 — Create the Next.js foundation

**Purpose:** Establish a clean framework baseline without rebuilding the whole app.

Tasks:
- Create a Next.js App Router project with TypeScript and strict checks.
- Establish formatting/linting and a predictable import convention.
- Copy static assets into `public/` without changing their content; update paths only where needed.
- Set up root metadata, fonts, global CSS variables, color tokens, and base styles.
- Configure the root layout and a temporary placeholder route.
- Keep the original project separate from the new project (recommended) until the migration is mature.
- Do not add a database, API, authentication, or new visual framework.

**Exit gate:** The Next.js app starts, builds, and serves the placeholder route. Static assets load correctly. No visual migration is considered complete yet.

### Phase 2 — Shared shell and navigation

**Purpose:** Rebuild the application frame before migrating individual pages.

Tasks:
- Implement the shared app shell: background, header, navigation/sidebar, quick-action dock, content area, and responsive behavior.
- Recreate active navigation states and map the old hash routes to Next.js routes.
- Preserve theme toggle and persistence behavior if present.
- Recreate shell-level transitions and animation timing.
- Keep page content as simple placeholders so shell differences are easy to inspect.

**Exit gate:** Shell screenshots match the original closely at agreed viewport sizes. Navigation, active states, theme, responsive layout, hover/focus states, and shell animations pass manual checks.

### Phase 3 — Shared UI primitives and mock-data conventions

**Purpose:** Avoid implementing slightly different versions of the same UI on every page.

Tasks:
- Identify repeated patterns such as cards, buttons, pills/badges, avatars, menus, dialogs, tabs, tables, chart wrappers, and empty states.
- Extract only components that are genuinely repeated or improve consistency.
- Define TypeScript types for the current mock records.
- Put mock records in predictable data/fixture modules rather than embedding large data arrays inside presentation components.
- Preserve class names/styles where practical to reduce visual regression risk.
- Avoid premature abstractions and avoid introducing a new design system during parity work.

**Exit gate:** Shared primitives look and behave like their original counterparts; mock data is separated cleanly enough to be replaced later.

### Phase 4 — Migrate Overview

**Purpose:** Validate the full migration approach on one representative page before scaling it to the rest.

Tasks:
- Rebuild KPI cards, charts, deals, team performance, tasks, events, and activity sections that exist in the reference.
- Preserve chart data presentation, legends, colors, axes, tooltips, empty states, and responsive behavior.
- Preserve entrance animations, staggered elements, hover effects, and interactive states.
- Use mock data and local state only.
- Verify every visible button/checkbox/control. If the original is a placeholder, preserve or clearly document that behavior rather than inventing a backend action.

**Exit gate:** Overview passes visual comparison and interaction checks at agreed desktop/tablet/mobile sizes. No known important animation is missing or materially different without approval.

### Phase 5 — Migrate Customers

Tasks:
- Recreate customer list/cards/table, search/filter/sort behavior, avatars, detail panels or routes where present, and empty states.
- Use mock data; keep state local.
- Preserve selection, menu, modal, and transition behavior.

**Exit gate:** Customer page passes the visual and interaction checklist, including responsive behavior.

### Phase 6 — Migrate Pipeline

Tasks:
- Recreate deal cards, stage columns, totals, filters, menus, and any drag/drop behavior that exists in the original.
- Do not invent drag-and-drop if the original does not support it.
- Use typed mock deals and local state.

**Exit gate:** Pipeline layout, deal interactions, scrolling, and animation behavior match the original.

### Phase 7 — Migrate remaining pages one at a time

Recommended order:
1. Projects
2. Schedule
3. Finance
4. Growth
5. Settings

For each page, repeat the same controlled loop:
1. Inventory its UI and behaviors.
2. Move its mock data into typed fixtures.
3. Implement the route and components.
4. Match visual details and motion.
5. Test interactions and responsive states.
6. Compare against baseline and fix regressions.
7. Commit the completed page before starting the next one.

**Exit gate:** Each page independently passes the same acceptance checklist. Do not mark a page complete merely because it renders.

### Phase 8 — Cross-page parity and stabilization

Tasks:
- Test every route and navigation path end-to-end.
- Test direct URL navigation, refresh behavior, browser back/forward, and not-found behavior.
- Test theme persistence, menus/dialogs, scrolling, keyboard focus, and responsive layouts.
- Compare the migrated app against baseline screenshots and animation references.
- Remove only genuinely obsolete migration scaffolding; keep the original reference until sign-off.
- Document intentional differences and known limitations.

**Exit gate:** All in-scope routes pass the full checklist; no unresolved high-impact visual, animation, navigation, or interaction regressions remain.

### Phase 9 — Backend readiness (planning only; do not start during UI parity phases)

Only after Phase 8 is signed off:
- Agree on entities, relationships, and business rules.
- Decide whether to use Next.js Route Handlers or a separate API service.
- Select the database and ORM, if needed.
- Add authentication and authorization design before exposing private CRM data.
- Define validation, error responses, pagination, and API contracts.
- Replace mock-data access behind a data-access boundary one feature at a time.
- Add integration tests and database migrations.

This phase is intentionally deferred. No API work is required for the initial shell/page migration.

## 5. Per-page acceptance checklist

Copy this checklist for every route.

- [ ] Layout and content hierarchy match the original.
- [ ] Typography, spacing, dimensions, colors, borders, shadows, and icons match.
- [ ] Correct local images, fonts, and assets load.
- [ ] Charts, legends, labels, tooltips, and responsive behavior match.
- [ ] Entrance, hover, focus, active, loading, and exit animations match where applicable.
- [ ] Menus, dialogs, tabs, filters, search, sorting, forms, and toggles behave as expected.
- [ ] Empty, error, and loading states are handled where applicable.
- [ ] Keyboard navigation and focus visibility are checked.
- [ ] Desktop, tablet, and mobile widths are compared against baseline.
- [ ] No console errors or missing assets are introduced.
- [ ] Data is mock data and no accidental API/backend dependency was added.
- [ ] Differences from the original are documented and approved.

## 6. Visual and animation validation method

Use the same viewport dimensions, browser zoom, theme, scroll position, and data state for original-versus-migrated comparisons.

For each page:
1. Capture a baseline screenshot from the original.
2. Capture the migrated page at the same viewport/state.
3. Compare full-page and important component-level screenshots.
4. Replay the same interaction sequence in both implementations.
5. Check animation start, direction, timing, easing, stagger, and final state.
6. Record mismatches and fix them before proceeding.

Screenshots alone do not prove animation parity. Keep short screen recordings or a written trigger/expected-result checklist for motion-heavy interactions.

## 7. Working agreement

- One phase or page per pull request/commit series where practical.
- Every change should have a clear scope and a way to compare against the reference.
- No backend integration before the UI stabilization gate.
- No design cleanup bundled into migration work unless explicitly approved.
- If an implementation choice risks changing the visual result, pause and compare rather than guessing.
- The user reviews and approves each phase before the next phase begins.

## 8. Immediate next actions

1. Confirm the original app opens and record the baseline.
2. Finish `docs/ui-inventory.md` and `docs/animation-inventory.md`.
3. Create the separate Next.js project and verify the base build.
4. Implement only the shared shell and navigation.
5. Compare and refine the shell before beginning Overview.
