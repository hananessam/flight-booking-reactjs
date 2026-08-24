import type { Flight } from './types'
import { PlaneIcon } from './icons'
import styles from './FlightCard.module.css'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

interface FlightCardProps {
  readonly flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.airline}>
        <span className={styles.airlineMark} aria-hidden="true">
          <PlaneIcon className={styles.airlineIcon} />
        </span>
        <span className={styles.airlineName}>{flight.airline}</span>
      </div>

      <div className={styles.point}>
        <span className={styles.code}>{flight.from}</span>
        <span className={styles.time}>{flight.fromTime}</span>
      </div>

      <div className={styles.duration}>
        <span className={styles.durationLabel}>{flight.duration}</span>
        <span className={styles.stopsLabel}>
          {flight.stops === 'non-stop' ? 'Non-stop' : flight.stops.replace('-', ' ')}
        </span>
      </div>

      <div className={styles.point}>
        <span className={styles.code}>{flight.to}</span>
        <span className={styles.time}>{flight.toTime}</span>
      </div>

      <span className={styles.price}>{priceFormatter.format(flight.price)}</span>

      <button type="button" className={styles.bookButton}>
        Book now
      </button>
    </article>
  )
}
