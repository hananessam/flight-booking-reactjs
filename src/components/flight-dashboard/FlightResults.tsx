import type { Flight } from './types'
import { FlightCard } from './FlightCard'
import styles from './FlightResults.module.css'

interface FlightResultsProps {
  readonly flights: readonly Flight[]
}

export function FlightResults({ flights }: FlightResultsProps) {
  return (
    <section className={styles.results} aria-label="Flight results">
      <h2 className={styles.heading}>Result ({flights.length})</h2>

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
