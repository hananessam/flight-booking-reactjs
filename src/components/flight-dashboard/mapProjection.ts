import type { CityOption } from './types'
import { LAND_GRID, LAT_BOTTOM, LAT_TOP } from './landGrid.generated'

const LON_SPAN = 360
const LAT_SPAN = LAT_TOP - LAT_BOTTOM

export const MAP_WIDTH = 246
/** Kept 1:1 with degrees-per-pixel on both axes so continents aren't stretched. */
export const MAP_HEIGHT = Math.round((MAP_WIDTH * LAT_SPAN) / LON_SPAN)

export interface Point {
  x: number
  y: number
}

/** Equirectangular projection — 1:1 degrees-per-pixel on both axes, no stretching. */
export function project(lat: number, lon: number): Point {
  return {
    x: ((lon + 180) / LON_SPAN) * MAP_WIDTH,
    y: ((LAT_TOP - lat) / LAT_SPAN) * MAP_HEIGHT,
  }
}

/** Real coastline data (see scripts/generate-land-grid.mjs), pre-projected once at module load. */
export const LAND_DOTS: Point[] = LAND_GRID.map(([lon, lat]) => project(lat, lon))

export interface RouteArc {
  from: Point
  to: Point
  control: Point
  /** Direction (degrees) the route arrives at `to`, for orienting a plane marker. */
  angle: number
}

export function routeArc(origin: CityOption, destination: CityOption): RouteArc {
  const from = project(origin.lat, origin.lon)
  const to = project(destination.lat, destination.lon)
  const dx = to.x - from.x
  const dy = to.y - from.y
  const curvature = 0.22
  const control = {
    x: (from.x + to.x) / 2 - dy * curvature,
    y: (from.y + to.y) / 2 + dx * curvature,
  }
  const angle = (Math.atan2(to.y - control.y, to.x - control.x) * 180) / Math.PI
  return { from, to, control, angle }
}
