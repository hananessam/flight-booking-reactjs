import { useState, type SubmitEvent } from 'react'
import type { CityOption, FlightSegment, SearchCriteria, TripType } from './types'
import {
  DEFAULT_DEPARTURE_DATE,
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
  DEFAULT_RETURN_DATE,
  DEFAULT_SEAT_CLASS,
  DEFAULT_SEGMENTS,
  TRIP_TYPES,
  createEmptySegment,
} from './data'
import { PlusIcon, SwapIcon } from './icons'
import { CityField } from './CityField'
import { ClassField } from './ClassField'
import { DateField } from './DateField'
import { TravellerField } from './TravellerField'
import { FlightSegmentRow } from './FlightSegmentRow'
import fieldStyles from './fields.module.css'
import styles from './SearchPanel.module.css'

const MIN_SEGMENTS = 2
const MAX_SEGMENTS = 5

interface SearchPanelProps {
  readonly onSearch: (criteria: SearchCriteria) => void
}

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [tripType, setTripType] = useState<TripType>('one-way')
  const [origin, setOrigin] = useState<CityOption>(DEFAULT_ORIGIN)
  const [destination, setDestination] = useState<CityOption>(DEFAULT_DESTINATION)
  const [departureDate, setDepartureDate] = useState(DEFAULT_DEPARTURE_DATE)
  const [returnDate, setReturnDate] = useState(DEFAULT_RETURN_DATE)
  const [travellers, setTravellers] = useState(2)
  const [seatClass, setSeatClass] = useState(DEFAULT_SEAT_CLASS)
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

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    const route = tripType === 'multi-city' ? segments[0] : { from: origin, to: destination }
    if (!route.from || !route.to) return

    onSearch({
      tripType,
      origin: route.from,
      destination: route.to,
      departureDate: tripType === 'multi-city' ? (segments[0].date ?? departureDate) : departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : null,
      travellers,
      seatClass,
      segments: tripType === 'multi-city' ? segments : [],
    })
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
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
        <div className={`${styles.fieldsRow} flex-col items-stretch md:flex-row md:items-center`}>
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

      <div className={`${styles.optionsRow} flex-col items-stretch gap-3 sm:flex-row sm:items-center`}>
        <fieldset className={`${styles.tripTabs} sm:w-auto`}>
          <legend className={styles.visuallyHidden}>Trip type</legend>
          {TRIP_TYPES.map((trip) => (
            <button
              key={trip.id}
              type="button"
              className={`${styles.tripTab} flex-1 text-center sm:flex-none`}
              data-active={trip.id === tripType}
              aria-pressed={trip.id === tripType}
              onClick={() => setTripType(trip.id)}
            >
              {trip.label}
            </button>
          ))}
        </fieldset>

        <div className={styles.rightOptions}>
          <ClassField value={seatClass} onChange={setSeatClass} />

          <button type="submit" className={`${styles.searchButton} flex-1 sm:flex-none`}>
            Search
          </button>
        </div>
      </div>
    </form>
  )
}
