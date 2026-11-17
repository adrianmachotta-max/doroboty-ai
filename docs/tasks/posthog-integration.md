# PostHog integration for Event Scout

## Intent

Connect this Netlify-hosted prototype to its own PostHog project and verify one production pageview and one button click. Vercel is unavailable under company policy; keep the existing Netlify deployment.

## Acceptance criteria

- The browser SDK initializes only when a PostHog project key is supplied at build time; local development sends no analytics.
- Public pageviews omit query parameters. Autocapture records clicks on links and buttons, not form interaction or copied text.
- Workspace, sign-in, and application screens are excluded from autocapture. Session recording stays disabled.
- Netlify production build receives the project key and host through environment variables; no key is committed.
- Verify the public production URL and confirm Pageview plus Autocapture in the matching PostHog project's Activity → Live.

## Implementation and verification

Implemented in `src/analytics.tsx`, `src/main.tsx`, `src/features/prototype/app.tsx`, and `src/features/prototype/shell.tsx`. Added `posthog-js`; updated `FEATURES.md`, the privacy screen, and `README.md` with the optional production configuration.

The complete `./scripts/verify` gate passes with temporary Node 24.22.3: design-system checks, lint, typecheck, 27 unit tests, participant-packet verification, production build, and all 34 Playwright tests.

Production deployment and live-event verification are pending: the PostHog tab opened in the available Codex browser is signed out. See `../analyses/2026-11-17-posthog-event-scout.md` for the exact remaining setup.
