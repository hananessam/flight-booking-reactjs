import { useState } from 'react'
import type { FlightSegment, TripType } from './types'
import { DEFAULT_SEGMENTS, createEmptySegment } from './data'
import {
  CalendarIcon,
  ChevronDownIcon,
  PersonIcon,
  PinIcon,
  PlusIcon,
  SeatClassIcon,
  SwapIcon,
} from './icons'
import { FlightSegmentRow } from './FlightSegmentRow'
import fieldStyles from './fields.module.css'
import styles from './SearchPanel.module.css'

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: 'one-way', label: 'One way' },
  { id: 'round-trip', label: 'Round trip' },
  { id: 'multi-city', label: 'Multi city' },
]

const RETURN_DATE = '5 August 2019'
const MIN_SEGMENTS = 2
const MAX_SEGMENTS = 5

export function SearchPanel() {
  const [tripType, setTripType] = useState<TripType>('one-way')
  const [segments, setSegments] = useState<FlightSegment[]>(DEFAULT_SEGMENTS)

  function addSegment() {
    setSegments((prev) => (prev.length >= MAX_SEGMENTS ? prev : [...prev, createEmptySegment()]))
  }

  function removeSegment(id: string) {
    setSegments((prev) => (prev.length <= MIN_SEGMENTS ? prev : prev.filter((segment) => segment.id !== id)))
  }

  return (
    <form className={styles.panel} onSubmit={(event) => event.preventDefault()}>
      {tripType === 'multi-city' ? (
        <div className={styles.segments}>
          {segments.map((segment, index) => (
            <FlightSegmentRow
              key={segment.id}
              segment={segment}
              index={index}
              canRemove={segments.length > MIN_SEGMENTS}
              onRemove={() => removeSegment(segment.id)}
            />
          ))}

          {segments.length < MAX_SEGMENTS && (
            <button type="button" className={styles.addSegment} onClick={addSegment}>
              <PlusIcon className={fieldStyles.fieldIcon} />
              <span>Add another flight</span>
            </button>
          )}

          <button
            type="button"
            className={`${fieldStyles.field} ${fieldStyles.fieldFixed} ${styles.travellerField}`}
          >
            <PersonIcon className={fieldStyles.fieldIcon} />
            <span>2 traveller</span>
          </button>
        </div>
      ) : (
        <div className={styles.fieldsRow}>
          <button type="button" className={fieldStyles.field}>
            <PinIcon className={fieldStyles.fieldIcon} />
            <span>New York (JFK)</span>
          </button>

          <button type="button" className={fieldStyles.swapButton} aria-label="Swap origin and destination">
            <SwapIcon className={fieldStyles.swapIcon} />
          </button>

          <button type="button" className={fieldStyles.field}>
            <PinIcon className={fieldStyles.fieldIcon} />
            <span>Mumbai (BOM)</span>
          </button>

          <button type="button" className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}>
            <CalendarIcon className={fieldStyles.fieldIcon} />
            <span>29 July 2019</span>
          </button>

          {tripType === 'round-trip' && (
            <button type="button" className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}>
              <CalendarIcon className={fieldStyles.fieldIcon} />
              <span>{RETURN_DATE}</span>
            </button>
          )}

          <button type="button" className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}>
            <PersonIcon className={fieldStyles.fieldIcon} />
            <span>2 traveller</span>
          </button>
        </div>
      )}

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
            <SeatClassIcon className={fieldStyles.fieldIcon} />
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
