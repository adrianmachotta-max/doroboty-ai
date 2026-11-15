# Netlify build configuration

## Intent

The Netlify project is linked to this repository, but its dashboard has no build command or publish directory configured. The live domain serves the unbuilt Vite `index.html`, which points at `/src/main.tsx` and renders blank. Add the build configuration at the repository root so Git-based deployments build the app and publish `dist/`.

## Acceptance criteria

- Netlify runs `npm run build` from the repository root.
- Netlify publishes the generated `dist/` directory.
- The project uses Node 24 from `.nvmrc`.
- The production deploy serves Vite-generated assets and the public site renders without a Netlify login.
- No product behavior or user data changes.
