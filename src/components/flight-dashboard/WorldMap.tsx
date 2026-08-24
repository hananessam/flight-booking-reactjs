import type { CSSProperties } from 'react'
import type { CityOption } from './types'
import { LAND_DOTS, MAP_HEIGHT, MAP_WIDTH, type Point, routeArc } from './mapProjection'
import { PlaneMarkerIcon } from './icons'
import styles from './WorldMap.module.css'

interface WorldMapProps {
  readonly origin: CityOption
  readonly destination: CityOption
}

const LABEL_EDGE = 30

function labelStyle(point: Point): CSSProperties {
  const translateY = point.y < MAP_HEIGHT - 14 ? 12 : -12
  let translateX = '-50%'
  if (point.x < LABEL_EDGE) translateX = '0%'
  else if (point.x > MAP_WIDTH - LABEL_EDGE) translateX = '-100%'

  return {
    left: point.x,
    top: point.y,
    transform: `translate(${translateX}, ${translateY}px)`,
  }
}

export function WorldMap({ origin, destination }: WorldMapProps) {
  const { from, to, control, angle } = routeArc(origin, destination)

  return (
    <div className={styles.map} aria-hidden="true">
      <div className={styles.inner} style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
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
          style={{ left: to.x, top: to.y, transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
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
