Keep the folder structure intact. The bundled app expects the URL path `/rapport/`. Open PowerShell in the parent folder (`cac-crm`) and run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/rapport/> in your browser. The app uses JavaScript modules, so use the local server rather than opening `index.html` directly as a `file://` URL.

# Rapport CRM — Frontend Mirror

> Working documentation for the existing mirrored CRM frontend and its planned, gradual migration to Next.js.
>
> **Migration principle:** preserve the current UI, layout, styling, and animation behavior before improving or replacing implementation details. Migrate incrementally and validate every step against the original.

## Project overview

This repository is a mirrored frontend for a CRM-style application. It contains a main HTML entry point, shared CSS, production-built JavaScript/CSS assets, an additional readable Overview-page implementation, and local portrait images.

The current copy appears to be a built frontend rather than a complete original source project. The JavaScript and CSS files under `assets/` have generated/hash-based names and should be treated as compiled output unless further source files are found. The archive does not show a root `package.json`, lockfile, or normal application source tree, so do not assume the original development commands or dependencies are recoverable from this copy.

## Current folder structure

The following tree is based on the files present in the supplied archive. Hashed asset filenames are shown as they currently exist; hashes may change if the mirrored app is rebuilt or replaced.

```text
rapport/
├── .git/                         # Git repository metadata and history
├── assets/
│   ├── charts-DZ93ArZm.js         # Chart-related JavaScript bundle
│   ├── customers-BKd8WRW4.css     # Customers page styles
│   ├── customers-DfpAyrPQ.js      # Customers page JavaScript bundle
│   ├── finance-8xkieMc-.js        # Finance page JavaScript bundle
│   ├── finance-xaw0gAQF.css       # Finance page styles
│   ├── growth-CLLZ__wZ.js         # Growth page JavaScript bundle
│   ├── growth-UUCB0_ZR.css        # Growth page styles
│   ├── index-Dxe3jV5a.css         # Shared/application styles bundle
│   ├── index-Dywa6qru.js          # Main application JavaScript bundle
│   ├── overview-B5nk_6Xf.css      # Overview page styles
│   ├── overview-miobGYkq.js       # Overview page JavaScript bundle
│   ├── pipeline-B75gsvlZ.js       # Pipeline page JavaScript bundle
│   ├── pipeline-BFzOllNL.css      # Pipeline page styles
│   ├── projects-ByG3aeRi.js       # Projects page JavaScript bundle
│   ├── projects-DHVOFd1L.css      # Projects page styles
│   ├── schedule-D1EmyAoQ.css      # Schedule page styles
│   ├── schedule-D5eRMeQQ.js       # Schedule page JavaScript bundle
│   ├── settings-D9kdrttJ.css      # Settings page styles
│   └── settings-Wt2GehgQ.js       # Settings page JavaScript bundle
├── photos/
│   └── 168-rapport/
│       ├── amara-okafor-sm.jpg
│       ├── clara-vos-sm.jpg
│       ├── daniel-osei-sm.jpg
│       ├── graham-whitley-sm.jpg
│       ├── hanna-lindqvist-sm.jpg
│       ├── karim-haddad-sm.jpg
│       ├── kenji-arai-sm.jpg
│       ├── lucia-moreno-sm.jpg
│       ├── mei-tanaka-sm.jpg
│       ├── rohan-mehta-sm.jpg
│       ├── sofia-reyes-sm.jpg
│       └── theo-adeyemi-sm.jpg
├── cac-crm.code-workspace         # VS Code workspace settings
├── claude-fragment.js             # Readable/standalone Overview implementation logic
├── claude-overview.html           # Readable/standalone Overview implementation
├── favicon.png                    # Application favicon
├── index.html                     # Main HTML entry point and application shell
├── README.md                      # Existing project notes (this document replaces/expands it)
└── style.css                      # Shared stylesheet for the mirrored/readable implementation
```

> The `.git/` directory contains internal Git files (objects, refs, hooks, and logs), not application source. It is intentionally summarized rather than expanded in this tree.

## Main application areas

The current interface contains or references these CRM areas:

- **Overview** — KPI/revenue cards, charts, deals, team performance, tasks, events, and recent activity.
- **Customers** — customer/contact records and related customer-management UI.
- **Pipeline** — deals and sales stages.
- **Projects** — project-oriented views.
- **Schedule** — calendar/scheduling views.
- **Finance** — finance-related views.
- **Growth** — growth and performance reporting.
- **Settings** — application settings.

The existing app uses hash-style routes such as `#/customers` and `#/pipeline`. During migration, each route should be mapped deliberately to a Next.js App Router route and tested for navigation parity.

## Current implementation notes

- The `assets/` directory contains bundled, hashed JS and CSS files, not clearly separated source components.
- `index.html` is the entry point for the mirrored application.
- `style.css`, `claude-overview.html`, and `claude-fragment.js` provide a more readable implementation/reference for at least part of the UI. Confirm how these files relate to the bundled app before treating them as the single source of truth.
- Some interface data appears to be hardcoded/mock data.
- Some actions may be placeholders rather than fully implemented workflows. Audit these one by one; do not infer that a visible control is functional just because it renders.
- Browser local storage is used for at least some client-side preferences/state in the existing implementation.
- The current archive does not establish a backend, database schema, API contract, authentication system, or authorization model.
- No backend or API integration is required in the initial Next.js migration phases. Mock data is acceptable until the UI is stable.

## Running the mirrored frontend

The exact run command should be verified against the existing README and `index.html` before changing anything. Because the archive does not contain a root `package.json`, do not assume `npm run dev` is available. A static server may be sufficient for the mirrored build, provided asset paths and client-side routing work under the selected base path.

Keep an untouched copy of the archive and confirm the original can still be opened before beginning migration work.

## Migration documentation

See [`MIGRATION_PLAN.md`](./MIGRATION_PLAN.md) for the phased Next.js migration plan, preservation rules, validation gates, and completion criteria.

## Non-negotiable migration rules

1. **Do not redesign while migrating.** Visual changes require explicit agreement and should be separated from parity work.
2. **Preserve animation.** Inventory motion, timing, easing, hover/focus behavior, transitions, and reduced-motion behavior before replacing implementation details.
3. **One controlled step at a time.** Keep each phase small, reviewable, and reversible.
4. **Compare against the original.** Capture baseline screenshots and interaction recordings at consistent viewport sizes and states.
5. **No early backend work.** Use typed mock data and local state during shell/page migration. Add APIs only after the UI migration has passed its acceptance checks.
6. **Do not delete the reference implementation prematurely.** Keep the original available until all migrated pages have been checked and signed off.
7. **No silent scope expansion.** Dependencies, component libraries, styling rewrites, and animation libraries must be justified before adoption.
