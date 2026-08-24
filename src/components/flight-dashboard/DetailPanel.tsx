import { PRICE_RANGE } from './data'
import type { CityOption, PriceRange, StopFilter } from './types'
import { PlaneMarkerIcon } from './icons'
import { PriceRangeSlider } from './PriceRangeSlider'
import { WorldMap } from './WorldMap'
import styles from './DetailPanel.module.css'

const STOP_FILTERS: { id: StopFilter; label: string }[] = [
  { id: 'non-stop', label: 'Non stop' },
  { id: 'one-stop', label: 'One stop' },
  { id: 'more-stops', label: 'More stop' },
]

interface DetailPanelProps {
  readonly origin: CityOption
  readonly destination: CityOption
  readonly stopFilter: StopFilter
  readonly onStopFilterChange: (filter: StopFilter) => void
  readonly priceRange: PriceRange
  readonly onPriceRangeChange: (range: PriceRange) => void
}

export function DetailPanel({
  origin,
  destination,
  stopFilter,
  onStopFilterChange,
  priceRange,
  onPriceRangeChange,
}: DetailPanelProps) {
  const activeLabel = STOP_FILTERS.find((filter) => filter.id === stopFilter)?.label

  return (
    <aside className={`${styles.panel} w-full lg:w-[290px]`} aria-label="Route and price filters">
      <div className={styles.route}>
        <div className={styles.routeEndpoint}>
          <span className={styles.routeLabel}>From</span>
          <span className={styles.routeCode}>{origin.code}</span>
        </div>
        <div className={styles.routeMid} aria-hidden="true">
          <PlaneMarkerIcon className={styles.routeMidIcon} />
          <span className={styles.routeMidLabel}>{activeLabel}</span>
        </div>
        <div className={`${styles.routeEndpoint} ${styles.routeEndpointEnd}`}>
          <span className={styles.routeLabel}>To</span>
          <span className={styles.routeCode}>{destination.code}</span>
        </div>
      </div>

      <WorldMap origin={origin} destination={destination} />

      <fieldset className={styles.stopFilters}>
        <legend className={styles.visuallyHidden}>Number of stops</legend>
        {STOP_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.stopFilter}
            data-active={filter.id === stopFilter}
            aria-pressed={filter.id === stopFilter}
            onClick={() => onStopFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </fieldset>

      <div className={styles.priceSection}>
        <span className={styles.priceLabel}>Price</span>
        <PriceRangeSlider
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={PRICE_RANGE.step}
          value={priceRange}
          onChange={onPriceRangeChange}
        />
        <div className={styles.priceBounds}>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  )
}
