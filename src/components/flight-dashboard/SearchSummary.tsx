import { TRIP_TYPES } from './data'
import type { SearchCriteria } from './types'
import { formatDisplayDate } from './date'
import styles from './SearchSummary.module.css'

interface SearchSummaryProps {
  readonly search: SearchCriteria
}

export function SearchSummary({ search }: SearchSummaryProps) {
  const tripLabel = TRIP_TYPES.find((trip) => trip.id === search.tripType)?.label ?? search.tripType

  const dateLabel =
    search.tripType === 'round-trip' && search.returnDate
      ? `${formatDisplayDate(search.departureDate)} – ${formatDisplayDate(search.returnDate)}`
      : formatDisplayDate(search.departureDate)

  const extraLegs = search.tripType === 'multi-city' && search.segments.length > 1 ? search.segments.length - 1 : 0

  const parts = [
    `${search.origin.code} → ${search.destination.code}${extraLegs > 0 ? ` +${extraLegs} more` : ''}`,
    tripLabel,
    dateLabel,
    `${search.travellers} ${search.travellers === 1 ? 'traveller' : 'travellers'}`,
    search.seatClass.label,
  ]

  return (
    <p className={styles.summary}>
      {parts.map((part, index) => (
        <span key={part} className={styles.part}>
          {index > 0 && (
            <span className={styles.dot} aria-hidden="true">
              &middot;
            </span>
          )}
          {part}
        </span>
      ))}
    </p>
  )
}
