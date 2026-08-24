import type { Flight } from './types'
import { ChevronDownIcon, FilterIcon } from './icons'
import { FlightCard } from './FlightCard'
import styles from './FlightResults.module.css'

interface FlightResultsProps {
  readonly flights: readonly Flight[]
}

export function FlightResults({ flights }: FlightResultsProps) {
  return (
    <section className={styles.results} aria-label="Flight results">
      <div className={styles.header}>
        <h2 className={styles.heading}>Result ({flights.length})</h2>
        <div className={styles.actions}>
          <button type="button" className={styles.actionButton}>
            <FilterIcon className={styles.actionIcon} />
            <span>Filter</span>
          </button>
          <button type="button" className={styles.actionButton}>
            <span>Ticket of class</span>
            <ChevronDownIcon className={styles.actionIcon} />
          </button>
        </div>
      </div>

      {flights.length > 0 ? (
        <ul className={styles.list}>
          {flights.map((flight) => (
            <li key={flight.id}>
              <FlightCard flight={flight} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No flights match your search.</p>
      )}
    </section>
  )
}
