import type { CSSProperties } from 'react'
import type { CityOption } from './types'
import { LAND_DOTS, MAP_HEIGHT, MAP_WIDTH, type Point, routeArc } from './mapProjection'
import { PlaneMarkerIcon } from './icons'
import styles from './WorldMap.module.css'

interface WorldMapProps {
  readonly origin: CityOption
  readonly destination: CityOption
}

const LABEL_EDGE_PCT = 12

/** Percentage-of-container positioning so the fixed lon/lat projection stays aligned at any rendered width. */
function toPercent(point: Point) {
  return { xPct: (point.x / MAP_WIDTH) * 100, yPct: (point.y / MAP_HEIGHT) * 100 }
}

function labelStyle(point: Point): CSSProperties {
  const { xPct, yPct } = toPercent(point)
  const translateY = yPct < 85 ? 12 : -12
  let translateX = '-50%'
  if (xPct < LABEL_EDGE_PCT) translateX = '0%'
  else if (xPct > 100 - LABEL_EDGE_PCT) translateX = '-100%'

  return {
    left: `${xPct}%`,
    top: `${yPct}%`,
    transform: `translate(${translateX}, ${translateY}px)`,
  }
}

function markerStyle(point: Point): CSSProperties {
  const { xPct, yPct } = toPercent(point)
  return { left: `${xPct}%`, top: `${yPct}%` }
}

export function WorldMap({ origin, destination }: WorldMapProps) {
  const { from, to, control, angle } = routeArc(origin, destination)

  return (
    <div className={styles.map} aria-hidden="true">
      <div className={styles.inner} style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}>
        <svg className={styles.svg} viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}>
          {LAND_DOTS.map((dot, index) => (
            <circle key={index} className={styles.landDot} cx={dot.x} cy={dot.y} r={0.7} />
          ))}

          <path
            className={styles.routeLine}
            d={`M${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`}
          />

          <circle className={styles.cityDot} cx={from.x} cy={from.y} r="3.2" />
          <circle className={styles.cityRing} cx={from.x} cy={from.y} r="6.5" />
          <circle className={styles.cityDot} cx={to.x} cy={to.y} r="3.2" />
          <circle className={styles.cityRing} cx={to.x} cy={to.y} r="6.5" />
        </svg>

        <PlaneMarkerIcon
          className={styles.plane}
          style={{ ...markerStyle(to), transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
        />

        <span className={styles.cityLabel} style={labelStyle(from)}>
          {origin.city}
        </span>
        <span className={styles.cityLabel} style={labelStyle(to)}>
          {destination.city}
        </span>
      </div>
    </div>
  )
}
