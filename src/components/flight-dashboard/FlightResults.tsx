import { FLIGHTS, TOTAL_RESULTS } from './data'
import { ChevronDownIcon, FilterIcon } from './icons'
import { FlightCard } from './FlightCard'
import styles from './FlightResults.module.css'

export function FlightResults() {
  return (
    <section className={styles.results} aria-label="Flight results">
      <div className={styles.header}>
        <h2 className={styles.heading}>Result ({TOTAL_RESULTS})</h2>
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

      <ul className={styles.list}>
        {FLIGHTS.map((flight) => (
          <li key={flight.id}>
            <FlightCard flight={flight} />
          </li>
        ))}
      </ul>
    </section>
  )
}
