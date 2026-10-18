# Rapport animation inventory — Phase 0

## Evidence and constraints

- Runtime evidence comes from `index.html` and the hashed production bundle
  (`assets/index-Dywa6qru.js` plus route-specific bundles). The standalone
  Overview files and `style.css` are a separate readable reference and are not
  the CSS/JS controlling the bundled CRM.
- The production shell uses GSAP and CSS transitions/keyframes. Timings below
  are values found in the bundle/styles; reduced-motion and hover behavior is
  implemented in code. Detailed frame-by-frame comparison/recording remains
  necessary during migration.
- Motion durations are passed through a helper that returns zero duration when
  `prefers-reduced-motion: reduce` is active. Shared CSS also sets transition
  and animation durations to zero and disables mesh `will-change`. A complete
  emulated reduced-motion audit has not yet been performed.

## Shared shell and route motion

| Trigger / element | Motion evidence | Expected visible result |
|---|---|---|
| Initial application entry | GSAP timeline fades in the mesh over 1.2s (`power2.out`); brand, tabs, and top tools enter from y=-14 with 0.06s stagger; dock enters from x=-90 with 0.9s `power3.out`; dock buttons stagger from y=10 by 0.035s. | Shell arrives in layered sequence; app is revealed after initialization. |
| Route/page entry | Heading text is split into word/character spans and animated. Head stats/actions enter from y=14 with 0.08s stagger; shared helpers animate content from opacity 0, y=40, alternating ±3° rotation, and scale .94 to its resting state over .8s (`back.out(1.4)`, default .06s stagger). Some visual/card elements scale from .6 to 1 over .6s (`back.out(3)`). | Page title and content appear in a staggered, spring-like sequence. |
| Main navigation | The active pill is positioned/animated on route change; source HTML describes independently moving edges so its width stretches without scaling. | Pill tracks the active route and label contrast changes with it. |
| Background mesh | Three blurred, fixed color fields; JS animates transforms on supported fine-pointer devices. Reduced-motion behavior is applied through the shared motion helper/CSS override. | Ambient background movement where supported. |
| Hover/focus | Dock tooltip fades in over .18s; controls/cards have route-specific color, opacity, transform, and border transitions. Fine-pointer/hover media queries are present; coarse-pointer variants exist. | Hover and focus feedback; tooltips are also focus-visible. |
| Toast/status | Toast enters from y=18 with opacity/scale change over .45s (`back.out(1.8)`) and exits by fading/moving downward. Call status has a .5s spring entrance and a 1.2s repeating ring pulse. | Feedback/status appears then dismisses; call pulse is transient/repeating while active. |

## Dialogs, popovers, and charts

| Trigger / element | Motion evidence | Expected visible result |
|---|---|---|
| Global search open | Native dialog animates opacity, y=-14, scale=.97 to rest over .38s (`back.out(1.6)`); result options stagger from y=8 by .025s. | Search panel and choices enter; input is focused. |
| Global search close | The close path fades/moves to y=-8 over .16s (`power2.in`), then closes the native dialog. | Panel exits before dismissal. Escape did not close the search dialog during the Phase 0 browser check; see the baseline issue in the UI inventory. |
| Popover/menu open/close | Shared helpers stagger option rows; position-aware movement is used for some menus. CSS opacity/transform transitions are typically .15–.3s. | Contextual options appear adjacent to their trigger; close on selection/outside/escape as implemented. |
| Chart/overview feedback | SVG charts have interactive status/tooltip behavior; quota ring animates its stroke offset (the readable standalone reference shows 1.1s), and bars/segments use transform/flex-grow transitions. | Data visualization settles from an animated state and responds to hover/period controls. Production chart timings are route-specific and require a more focused capture. |
| Schedule status | Schedule CSS includes a `sch-ping` animation lasting 1.2s. | Transient attention/status pulse. |

## CSS transitions observed

- Shared shell: tooltip opacity .18s; common background-color .15s; transform
  .3s; opacity .15s. Keyframes include `.is-flash` (.9s) and dialog backdrop
  fade (.3s).
- Overview: selected text/color transitions (.3s) and transform (.45s).
- Pipeline: opacity transitions (.2s and .25s).
- Customers: background/color transitions (.5s).
- Growth: background (.2s); opacity (.2s) and transform (.3s).
- Projects: color (.2s), opacity (.15s).
- Schedule: background/border-color (.25s), opacity (.2s), color (.3s), and
  `sch-ping` (1.2s).
- Finance and Settings have route-specific styles but no top-level transition
  declaration was found by this inventory scan; inspect nested/component rules
  before migration.

## Reduced motion, browser input, and open questions

- Shared JS reads `(prefers-reduced-motion: reduce)` and gates durations and
  some motion helpers. Shared CSS sets all transition/animation durations to
  zero under the media query.
- Hover-specific enhancements are conditioned on hover/fine-pointer media
  queries; coarse-pointer and no-hover CSS branches exist.
- The short-landscape condition (`height <= 500px` and width >= 761px) and
  short-height shell behavior should be checked at the point where shell
  responsiveness is migrated.
- The Phase 0 captures establish still-image references, not animation
  recordings. Before each page migration, record trigger, direction, duration,
  easing, stagger, final state, reduced-motion behavior, and keyboard/focus
  behavior for its important interactions. Do not infer parity from screenshots.
- Whether the observed GSAP target warnings cause a visible/motion regression is
  unresolved. Do not suppress them as part of migration without tracing their
  source.
