import { useState } from 'react'
import type { StopFilter } from './types'
import { PlaneMarkerIcon } from './icons'
import styles from './DetailPanel.module.css'

const STOP_FILTERS: { id: StopFilter; label: string }[] = [
  { id: 'non-stop', label: 'Non stop' },
  { id: 'one-stop', label: 'One stop' },
  { id: 'more-stops', label: 'More stop' },
]

const PRICE_RANGE = { min: 500, max: 2500 }

export function DetailPanel() {
  const [stopFilter, setStopFilter] = useState<StopFilter>('non-stop')

  return (
    <aside className={styles.panel} aria-label="Route and price filters">
      <div className={styles.route}>
        <div className={styles.routeEndpoint}>
          <span className={styles.routeLabel}>From</span>
          <span className={styles.routeCode}>JFK</span>
        </div>
        <div className={styles.routeMid} aria-hidden="true">
          <PlaneMarkerIcon className={styles.routeMidIcon} />
          <span className={styles.routeMidLabel}>Non-stop</span>
        </div>
        <div className={`${styles.routeEndpoint} ${styles.routeEndpointEnd}`}>
          <span className={styles.routeLabel}>To</span>
          <span className={styles.routeCode}>BOM</span>
        </div>
      </div>

      <div className={styles.map} aria-hidden="true">
        <svg className={styles.mapSvg} viewBox="0 0 246 190">
          <path className={styles.mapLine} d="M30 150 C 80 90, 150 130, 190 40" />
          <circle className={styles.mapDot} cx="30" cy="150" r="4.5" />
          <circle className={styles.mapRing} cx="30" cy="150" r="9" />
          <circle className={styles.mapDot} cx="190" cy="40" r="4.5" />
          <circle className={styles.mapRing} cx="190" cy="40" r="9" />
        </svg>
        <PlaneMarkerIcon className={styles.mapPlane} />
        <span className={`${styles.mapCity} ${styles.mapCityFrom}`}>New York</span>
        <span className={`${styles.mapCity} ${styles.mapCityTo}`}>Mumbai</span>
      </div>

      <fieldset className={styles.stopFilters}>
        <legend className={styles.visuallyHidden}>Number of stops</legend>
        {STOP_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.stopFilter}
            data-active={filter.id === stopFilter}
            aria-pressed={filter.id === stopFilter}
            onClick={() => setStopFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </fieldset>

      <div className={styles.priceSection}>
        <span className={styles.priceLabel}>Price</span>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.trackFill} />
          <div className={`${styles.handle} ${styles.handleMin}`} />
          <div className={`${styles.handle} ${styles.handleMax}`} />
        </div>
        <div className={styles.priceBounds}>
          <span>${PRICE_RANGE.min}</span>
          <span>${PRICE_RANGE.max}</span>
        </div>
      </div>
    </aside>
  )
}
