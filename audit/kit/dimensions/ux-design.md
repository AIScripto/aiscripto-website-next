# UX and Visual Design
**Finding ID prefix:** UXD
**Applies when:** there is a user interface (website, web app, desktop or mobile app). Skip for pure back-end or command-line projects.

## Goal
Judge whether the interface helps its intended users reach their goal quickly and with confidence, and whether it looks and behaves consistently. First decide what kind of product it is, because the yardstick differs:
- **Marketing / content site:** clear value proposition, findable information, strong and honest calls to action, fast first impression, trustworthy content.
- **Application / dashboard:** efficient repeated workflows, data density that fits the task, safe actions, clear system state.

Project-specific visual rules (brand, themes, component names) belong in the project module, not here. Judge brand choices by their effect on clarity, performance and accessibility, not by taste.

## What to check

### Information architecture and navigation
- [ ] Can a first-time visitor tell within a few seconds what the product is, who it is for and what to do next?
- [ ] Is navigation predictable, with the current location shown, and do menus work by mouse, touch and keyboard?
- [ ] Can users reach key content (pricing or contact, product details, main tasks) in few steps, and are dead ends (empty pages, broken links, soft 404s) absent?
- [ ] Are related pages linked so users and crawlers can move between them?

### Visual hierarchy and consistency
- [ ] Does each screen have one clear primary action, with secondary actions visibly quieter?
- [ ] Are headings, spacing, type sizes and colours applied from a consistent scale or token set rather than one-off values?
- [ ] Are shared components (buttons, fields, cards, dialogs, tables) reused instead of near-duplicate copies that drift apart?
- [ ] Do all supported themes (for example dark and light) reach the same quality, with no element that only works in one?
- [ ] Are decorative effects (animation, gradients, 3D, video) supporting the message rather than hiding content or slowing the page?

### Content and copy
- [ ] Is copy plain, specific and written for the real audience, without filler or unexplained jargon?
- [ ] Are claims, numbers, logos, testimonials and certifications real and supportable, rather than invented placeholders?
- [ ] Are labels, buttons and messages consistent in wording and case across the product?

### Responsive behaviour
- [ ] Does the layout work at phone, tablet, laptop and wide desktop widths without horizontal page scroll or clipped content?
- [ ] Are touch targets large enough, and do hover-only interactions have a touch and keyboard alternative?
- [ ] Do wide tables or media adapt (scroll inside their container, stack, or simplify) instead of breaking the page?

### Forms and state feedback
- [ ] Are forms short, with labelled fields, clear required markers and inline errors near the field?
- [ ] Do submits show a loading state, a clear success message and a recoverable failure message that keeps what the user typed?
- [ ] Do data views show loading, empty and error states that are distinct from each other (an error must not look like "no results")?
- [ ] Are destructive or costly actions confirmed, and undoable where possible?

### Motion and perceived performance
- [ ] Do animations have a purpose, stay short, and stop or reduce when the user prefers reduced motion?
- [ ] Can auto-advancing content (carousels, rotating text) be paused?
- [ ] Is the first meaningful content visible quickly, without layout shift as images, fonts or late widgets load?

## How to gather evidence
- Identify the product type and the three most important user journeys from routes, navigation and analytics events.
- Read page and component code for hierarchy, shared component use, token use and state handling.
- Walk the main journeys in a real browser at about 375, 768, 1280 and 1440 px, in every theme, with keyboard and with reduced motion on. Keep screenshots.
- Throttle the network and force failures (blocked request, invalid input) to see loading and error states. Never submit real data to production services.
- Compare copy and claims against what the product really offers; mark anything unverifiable as "cannot verify".

## Severity guidance
| Situation | Severity |
|---|---|
| The main conversion or task (contact, sign up, buy, save) fails, or failure is silent and loses user input | High |
| Invented or unsupportable claims, numbers or logos shown as real | High |
| A theme or common viewport makes key content unreadable or unreachable | Medium |
| Error state indistinguishable from an empty state on an important view | Medium |
| Inconsistent spacing, wording or one-off component styles | Low |

## Common false positives
- Deliberate brand styling (bold gradients, animation) that meets contrast, performance and reduced-motion needs.
- Placeholder content in clearly marked demo or sample sections.
- Differences between themes that are intentional and documented.
- Dense layouts in expert tools where density is the requirement.

## Strengths to look for
- A token-based design system and shared component library used everywhere.
- Clear, honest copy with one obvious next step per page.
- Every async action has loading, success and failure states.
- Real-browser checks of key journeys across viewports and themes, ideally automated.

## Scorecard hints
- **1:** Users cannot tell what to do; key actions fail silently; layout breaks on common screens.
- **3:** Main journeys work and look consistent; gaps in states, responsive edges, theme parity or copy quality.
- **5:** Clear hierarchy and copy, consistent system across themes and viewports, complete state feedback, verified in a real browser.
