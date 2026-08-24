import { useState } from 'react'
import type { CityOption, FlightSegment, TripType } from './types'
import {
  DEFAULT_DEPARTURE_DATE,
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
  DEFAULT_RETURN_DATE,
  DEFAULT_SEGMENTS,
  createEmptySegment,
} from './data'
import { ChevronDownIcon, PlusIcon, SeatClassIcon, SwapIcon } from './icons'
import { CityField } from './CityField'
import { DateField } from './DateField'
import { TravellerField } from './TravellerField'
import { FlightSegmentRow } from './FlightSegmentRow'
import fieldStyles from './fields.module.css'
import styles from './SearchPanel.module.css'

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: 'one-way', label: 'One way' },
  { id: 'round-trip', label: 'Round trip' },
  { id: 'multi-city', label: 'Multi city' },
]

const MIN_SEGMENTS = 2
const MAX_SEGMENTS = 5

export function SearchPanel() {
  const [tripType, setTripType] = useState<TripType>('one-way')
  const [origin, setOrigin] = useState<CityOption>(DEFAULT_ORIGIN)
  const [destination, setDestination] = useState<CityOption>(DEFAULT_DESTINATION)
  const [departureDate, setDepartureDate] = useState(DEFAULT_DEPARTURE_DATE)
  const [returnDate, setReturnDate] = useState(DEFAULT_RETURN_DATE)
  const [travellers, setTravellers] = useState(2)
  const [segments, setSegments] = useState<FlightSegment[]>(DEFAULT_SEGMENTS)

  function swapCities() {
    setOrigin(destination)
    setDestination(origin)
  }

  function addSegment() {
    setSegments((prev) => (prev.length >= MAX_SEGMENTS ? prev : [...prev, createEmptySegment()]))
  }

  function removeSegment(id: string) {
    setSegments((prev) => (prev.length <= MIN_SEGMENTS ? prev : prev.filter((segment) => segment.id !== id)))
  }

  function updateSegment(updated: FlightSegment) {
    setSegments((prev) => prev.map((segment) => (segment.id === updated.id ? updated : segment)))
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
              onChange={updateSegment}
            />
          ))}

          {segments.length < MAX_SEGMENTS && (
            <button type="button" className={styles.addSegment} onClick={addSegment}>
              <PlusIcon className={fieldStyles.fieldIcon} />
              <span>Add another flight</span>
            </button>
          )}

          <TravellerField value={travellers} onChange={setTravellers} className={styles.travellerField} />
        </div>
      ) : (
        <div className={styles.fieldsRow}>
          <CityField value={origin} onChange={setOrigin} excludeCode={destination.code} ariaLabel="Origin" />

          <button type="button" className={fieldStyles.swapButton} aria-label="Swap origin and destination" onClick={swapCities}>
            <SwapIcon className={fieldStyles.swapIcon} />
          </button>

          <CityField value={destination} onChange={setDestination} excludeCode={origin.code} ariaLabel="Destination" />

          <DateField value={departureDate} onChange={setDepartureDate} />

          {tripType === 'round-trip' && <DateField value={returnDate} onChange={setReturnDate} />}

          <TravellerField value={travellers} onChange={setTravellers} />
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
