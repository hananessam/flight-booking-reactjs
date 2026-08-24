# Flight Booking Dashboard

A flight search dashboard UI built with React, TypeScript, and Vite.

**Live demo:** [flight-booking-reactjs.vercel.app](https://flight-booking-reactjs.vercel.app/)

## Features

- **Flight search** — origin/destination pickers, a real calendar date picker, a traveller-count stepper, seat class selection, and one-way / round-trip / multi-city trip types
- **Real filtering** — results are filtered by route, date, number of stops, seat class, traveller capacity, and a draggable price range, all against mock flight data
- **World map** — the detail panel renders an actual world map (sampled from real coastline data) and plots the searched route with a curved flight path
- **Client-side routing** — a persistent sidebar (Dashboard, Flights, Wallet, Reports, Statistics, Settings) backed by React Router; Flights is the fully built page, the rest are placeholders
- **Responsive** — the sidebar collapses to an icon rail, search fields and results stack, and flight cards reflow on narrow screens

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) with the React Compiler enabled
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) for responsive layout, alongside CSS Modules for component styling
- [world-atlas](https://github.com/topojson/world-atlas) + [d3-geo](https://github.com/d3/d3-geo) (dev-only) to generate the world map's land data at build time

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run generate:map` | Regenerate `landGrid.generated.ts` from real coastline data |

## Project structure

Most of the app lives in `src/components/flight-dashboard/`:

- `DashboardLayout.tsx` — the shared shell (sidebar + content outlet)
- `pages/` — route-level pages (`FlightsPage`, `PlaceholderPage`)
- `SearchPanel.tsx` + field components (`CityField`, `DateField`, `TravellerField`, `ClassField`) — the search form
- `FlightResults.tsx` / `FlightCard.tsx` — the results list
- `DetailPanel.tsx` / `WorldMap.tsx` / `mapProjection.ts` — the route map and price/stop filters
- `data.ts` / `types.ts` — mock flight data and shared types
