import { useState } from 'react'
import type { Flight, SeatClassOption } from './types'
import { PlaneIcon } from './icons'
import { BookingModal } from './BookingModal'
import styles from './FlightCard.module.css'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

interface FlightCardProps {
  readonly flight: Flight
  readonly travellers: number
  readonly seatClass: SeatClassOption
}

export function FlightCard({ flight, travellers, seatClass }: FlightCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

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

      <button
        type="button"
        className={styles.bookButton}
        disabled={isBooked}
        onClick={() => setIsModalOpen(true)}
      >
        {isBooked ? 'Booked' : 'Book now'}
      </button>

      {isModalOpen && (
        <BookingModal
          flight={flight}
          travellers={travellers}
          seatClass={seatClass}
          onClose={() => setIsModalOpen(false)}
          onConfirmed={() => setIsBooked(true)}
        />
      )}
    </article>
  )
}
