# Rapport UI inventory — Phase 0

## Scope and capture setup

- Reference implementation: `index.html` with the generated files in `assets/`.
- Readable but separate Overview reference: `claude-overview.html`,
  `claude-fragment.js`, and `style.css`. These are not the application entry
  point used by the running CRM.
- Run from the parent of `rapport` with `python -m http.server 8000`, then open
  `http://localhost:8000/rapport/`.
- Route model: hash routes (`#/overview`, `#/pipeline`, `#/customers`,
  `#/schedule`, `#/finance`, `#/growth`, `#/projects`, `#/settings`).
- Phase 0 captures use light theme, the browser's default zoom, seeded mock
  data, and no open popovers/dialogs. The integrated browser reported a
  975 × 592 CSS viewport at DPR 1 on every captured route. Full-page captures
  are used so below-the-fold layout is included.
- This is a single measured reference viewport, not an agreed supported-size
  matrix. Separate tablet/mobile captures are not included; the browser
  viewport override produced inconsistent rendering and was discarded rather
  than recording misleading sizes.
- Fixtures are date-sensitive and browser-local. The baseline was captured
  with a clean `rapport:v1` store on 2026-10-19; displayed dates and values may
  advance with the app's date seed.

## Shared shell

- Warm light/dark theme, blurred color mesh background, centered/max-width
  application frame, header with Rapport brand and horizontally scrollable
  route tabs.
- Fixed vertical quick-action dock at the left on larger screens; the settings
  route and theme control are in the dock. The top bar also has Activity,
  Notifications, and Account menu controls.
- Shell overlays include a keyboard-search dialog, notification/other popovers,
  a modal, a drawer, a scrim, a call status bar, and an undo toast.
- Navigation has seven top tabs; Settings is reached through the dock. Hash
  changes select a view and update the document title. The checked navigation
  paths reached every route and set the appropriate active state.
- Theme defaults to light, supports dark and system preference, and persists
  under `rapport:theme`. The page data/fixture state is stored locally under
  `rapport:v1`; the seed is regenerated when its stored seed date no longer
  matches the current app date.
- Buttons, dialog/menu contents, tab selection, search and local form state are
  client-side/mock behavior. No CRM API/backend request is required for the
  inspected flows.

## Route inventory

| Route | Visible page structure | Controls / observed behavior |
|---|---|---|
| `#/overview` | Sales Overview; Revenue, Hot deals, Team quota, Stage mix, Team leaderboard, Today, Recent activity. | Revenue period switches between 6M and 12M and updates the summary/chart. Task checkboxes toggle local completion/progress and activity feedback. Chart is SVG. Cards expose options/expand controls; deals expose per-item menus; Add task and quick actions are present. |
| `#/pipeline` | Deal Pipeline; Qualification, Proposal, Negotiation, Closing stages. | Search deals input, stage/deal controls and menus. |
| `#/customers` | Customer Directory. | Search name/company/city input, customer records and per-record actions. |
| `#/schedule` | Team Schedule; October 2026 calendar and Today agenda. | Calendar navigation/view controls, assignee/filter controls, event/task checkboxes and event actions. |
| `#/finance` | Revenue & Invoices; Cash flow, Aging, Invoices. | Invoice number/customer search, chart-period/filter/action controls, invoice-row actions. |
| `#/growth` | Growth Reports; Revenue by segment, Lead sources, New customers per month, Win rate trend, Top customers by revenue won, Rep performance. | Report range/segment/source controls and chart/table actions. |
| `#/projects` | Customer Projects. | Project search and project list/status actions. |
| `#/settings` | Workspace Settings; profile summary and Profile, Team, Notifications, Appearance, Data settings tabs. | Profile name/email/role/quota form, save/discard state, tab changes, appearance/theme and notification/data controls. |

The hash routes all rendered their corresponding page headings and content in
the baseline browser. A full control-by-control workflow check remains a
per-page migration acceptance task; the observed/verified Phase 0 interactions
are listed below.

## Phase 0 interaction checks

- Top-level route navigation: visited each of the eight hash routes; page heading
  and active route state changed correctly.
- Revenue period: selecting 6M changed the Overview summary to the 6-month
  value; selecting 12M restored the default period.
- Overview task checkbox: changed unchecked → checked → unchecked and updated
  local feedback/progress.
- Theme control: switched light → dark → light; theme attribute updated and
  preference persisted. The test preference was restored to light afterwards.
- Global search: opened the dialog and returned matching mock customer/deal
  results for “Analytics”.
- Notifications and Create controls: opened visible notification and creation
  surfaces; both show seeded/mock entries and actions.
- Page search/filter: customer search returned Priya Natarajan and hid Clara
  Vos; a no-match pipeline search emptied the deal cards; a no-match project
  search showed its empty state; a no-match invoice search showed the empty
  result state.
- Schedule checkbox: toggled a task from unchecked to checked and back.
- Settings tabs: Team, Notifications, Appearance, Data, and Profile each
  selected their corresponding tab panel. Editing then restoring the profile
  name enabled then disabled Save changes without saving a mutation.
- Hover: a hot-deal tile moved upward while hovered. Revenue chart pointer
  movement displayed the hovered month, won amount, and target in both tooltip
  and status content.
- Reduced motion: with `prefers-reduced-motion: reduce` emulated, the dock
  tooltip transition and shared animation duration computed to `0s`; mesh
  `will-change` computed to `auto`.

## Assets, typography, charts, persistence

- Main shell CSS/JS and route-specific CSS/JS are hashed build assets under
  `assets/`; the main JS dynamically loads page chunks.
- Portraits are local JPGs in `photos/168-rapport/`. The bundle also requests a
  non-existent `sofia-reyes.jpg` (see baseline issues).
- The shared CSS declares an Urbanist-first font stack. No local font file,
  `@font-face`, or external font stylesheet was found in this mirror, so the
  effective rendered font fallback remains browser/system dependent.
- Icons are predominantly inline SVGs. Overview revenue, quota, and stage charts
  render as SVG; chart-related code is bundled separately in
  `assets/charts-DZ93ArZm.js`.
- No application API/backend contract or database is present. UI records and
  settings are mock/local browser state.

## Responsive behavior and baseline files

Shared/page CSS contains breakpoints at 1180px, 900px, 760px, 480px, 400px, and
374px, with route-specific subsets; it also has hover/pointer and short
landscape-height conditions. In general the shell retains horizontally
scrollable navigation, while content grids collapse/reflow and the dock is
adjusted or hidden at narrow widths. The actual per-page differences should be
preserved, not replaced with a single assumed breakpoint.

Baseline full-page screenshot files (same 975 × 592 CSS viewport):

- `baseline/viewport-975x592/overview.png`
- `baseline/viewport-975x592/pipeline.png`
- `baseline/viewport-975x592/customers.png`
- `baseline/viewport-975x592/schedule.png`
- `baseline/viewport-975x592/finance.png`
- `baseline/viewport-975x592/growth.png`
- `baseline/viewport-975x592/projects.png`
- `baseline/viewport-975x592/settings.png`

## Known baseline issues and limitations

1. Loading the Settings profile issues a 404 for
   `/rapport/photos/168-rapport/sofia-reyes.jpg`; the available portrait is
   `sofia-reyes-sm.jpg`. This is pre-existing and was not changed.
2. The browser reports non-fatal GSAP “target not found” warnings during some
   page transitions (observed while navigating to Settings). They are baseline
   behavior to investigate before deciding whether they are harmless.
3. Pressing Escape while the global search input was focused left the native
   search dialog open in the baseline browser despite the visible “esc” hint.
   Reconfirm this behavior and record it as pre-existing if reproducible.
4. The exact full set of hidden menu actions and form-save outcomes has not been
   exhaustively exercised. Preserve the visible mock behavior and expand the
   route-specific interaction checklist before migrating each page.
5. The generated bundle does not expose original component/source boundaries;
   the hashed build should be treated as the runtime reference until source
   provenance is established.
6. The user's preferred desktop/tablet/mobile comparison sizes are not yet
   agreed. Capture additional responsive baselines at approved CSS viewport
   dimensions before treating this single-viewport baseline as the complete
   visual reference.
