import type { Flight, SeatClassOption } from './types'
import { FlightCard } from './FlightCard'
import styles from './FlightResults.module.css'

interface FlightResultsProps {
  readonly flights: readonly Flight[]
  readonly travellers: number
  readonly seatClass: SeatClassOption
}

export function FlightResults({ flights, travellers, seatClass }: FlightResultsProps) {
  return (
    <section className={styles.results} aria-label="Flight results">
      <h2 className={styles.heading}>Result ({flights.length})</h2>

      {flights.length > 0 ? (
        <ul className={styles.list}>
          {flights.map((flight) => (
            <li key={flight.id}>
              <FlightCard flight={flight} travellers={travellers} seatClass={seatClass} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No flights match your search.</p>
      )}
    </section>
  )
}
