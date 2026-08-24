import { useState } from 'react'
import type { TripType } from './types'
import {
  CalendarIcon,
  ChevronDownIcon,
  PersonIcon,
  PinIcon,
  SeatClassIcon,
  SwapIcon,
} from './icons'
import styles from './SearchPanel.module.css'

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: 'one-way', label: 'One way' },
  { id: 'round-trip', label: 'Round trip' },
  { id: 'multi-city', label: 'Multi city' },
]

export function SearchPanel() {
  const [tripType, setTripType] = useState<TripType>('one-way')

  return (
    <form className={styles.panel} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.fieldsRow}>
        <button type="button" className={styles.field}>
          <PinIcon className={styles.fieldIcon} />
          <span>New York (JFK)</span>
        </button>

        <button type="button" className={styles.swapButton} aria-label="Swap origin and destination">
          <SwapIcon className={styles.swapIcon} />
        </button>

        <button type="button" className={styles.field}>
          <PinIcon className={styles.fieldIcon} />
          <span>Mumbai (BOM)</span>
        </button>

        <button type="button" className={`${styles.field} ${styles.fieldFixed}`}>
          <CalendarIcon className={styles.fieldIcon} />
          <span>29 July 2019</span>
        </button>

        <button type="button" className={`${styles.field} ${styles.fieldFixed}`}>
          <PersonIcon className={styles.fieldIcon} />
          <span>2 traveller</span>
        </button>
      </div>

      <div className={styles.optionsRow}>
        <fieldset className={styles.tripTabs}>
          <legend className={styles.visuallyHidden}>Trip type</legend>
          {TRIP_TYPES.map((trip) => (
            <button
              key={trip.id}
              type="button"
              className={styles.tripTab}
              data-active={trip.id === tripType}
              aria-pressed={trip.id === tripType}
              onClick={() => setTripType(trip.id)}
            >
              {trip.label}
            </button>
          ))}
        </fieldset>

        <div className={styles.rightOptions}>
          <button type="button" className={styles.classSelector}>
            <SeatClassIcon className={styles.fieldIcon} />
            <span>First class</span>
            <ChevronDownIcon className={styles.chevron} />
          </button>

          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>
    </form>
  )
}
