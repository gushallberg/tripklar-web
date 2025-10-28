# Tripklar Web

Tripklar is a Next.js 14 + Tailwind CSS frontend that showcases mocked itinerary suggestions while the backend is prepared. This repo ships with Storybook, Playwright smoke tests, and GitHub Actions CI so that PRs can build previews on Vercel.

## Getting starte

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to explore the landing page and mocked scenarios.

### Storybook

```bash
npm run storybook
```

Storybook runs on http://localhost:6006 and includes two stories for each core component.

### Playwright smoke tests

```bash
npm run test:e2e
```

Playwright spins up the dev server automatically and verifies a small set of routes.

## API configuration

By default the app uses local mock handlers under `/api/mock/*`. When the backend is ready, create a `.env.local` file with:

```
NEXT_PUBLIC_API_BASE_URL=https://dev-api.tripklar.se
```

Restart the dev server (and Vercel deployment) so `lib/api.ts` starts calling the real backend endpoints:

- `GET ${NEXT_PUBLIC_API_BASE_URL}/api/suggest`
- `GET ${NEXT_PUBLIC_API_BASE_URL}/api/itineraries/:id`

SmartButtons already link to `/go/{partner}?target=...` URLs for outbound tracking.

## Linting

```bash
npm run lint
```

## Deployment

Deploy to Vercel and enable PR previews. Remember to add the preview link to each pull request description.
