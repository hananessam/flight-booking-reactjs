import { useEffect, useRef, useState } from 'react'
import type { Flight, SeatClassOption } from './types'
import { formatDisplayDate } from './date'
import { CheckIcon, CloseIcon, PlaneIcon } from './icons'
import styles from './BookingModal.module.css'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function createBookingReference(): string {
  return `BK-${crypto.randomUUID().slice(0, 6).toUpperCase()}`
}

interface BookingModalProps {
  readonly flight: Flight
  readonly travellers: number
  readonly seatClass: SeatClassOption
  readonly onClose: () => void
  readonly onConfirmed: () => void
}

export function BookingModal({ flight, travellers, seatClass, onClose, onConfirmed }: BookingModalProps) {
  const [step, setStep] = useState<'review' | 'confirmed'>('review')
  const [reference] = useState(createBookingReference)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const total = flight.price * travellers

  function handleConfirm() {
    setStep('confirmed')
    onConfirmed()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="booking-modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
      >
        <CloseIcon className="h-4 w-4" />
      </button>

      {step === 'review' ? (
        <>
          <div className={styles.airline}>
            <span className={styles.airlineMark} aria-hidden="true">
              <PlaneIcon className={styles.airlineIcon} />
            </span>
            <div>
              <p className={styles.eyebrow}>Confirm booking</p>
              <h2 id="booking-modal-title" className={styles.title}>
                {flight.airline}
              </h2>
            </div>
          </div>

          <div className={styles.route}>
            <div className={styles.routeEndpoint}>
              <span className={styles.routeCode}>{flight.from}</span>
              <span className={styles.routeTime}>{flight.fromTime}</span>
            </div>
            <div className={styles.routeMid} aria-hidden="true">
              <span className={styles.routeLine} />
              <span className={styles.routeDuration}>{flight.duration}</span>
            </div>
            <div className={`${styles.routeEndpoint} ${styles.routeEndpointEnd}`}>
              <span className={styles.routeCode}>{flight.to}</span>
              <span className={styles.routeTime}>{flight.toTime}</span>
            </div>
          </div>

          <dl className={styles.details}>
            <div className={styles.detailRow}>
              <dt>Date</dt>
              <dd>{formatDisplayDate(flight.date)}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Class</dt>
              <dd>{seatClass.label}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Travellers</dt>
              <dd>{travellers}</dd>
            </div>
            <div className={styles.detailRow}>
              <dt>Stops</dt>
              <dd>{flight.stops === 'non-stop' ? 'Non-stop' : flight.stops.replace('-', ' ')}</dd>
            </div>
          </dl>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalPrice}>{priceFormatter.format(total)}</span>
          </div>

          <button type="button" className={styles.confirmButton} onClick={handleConfirm}>
            Confirm booking
          </button>
        </>
      ) : (
        <div className={styles.success}>
          <span className={styles.successIcon} aria-hidden="true">
            <CheckIcon className="h-6 w-6" />
          </span>
          <h2 id="booking-modal-title" className={styles.title}>
            Booking confirmed
          </h2>
          <p className={styles.successCopy}>
            {flight.from} → {flight.to} with {flight.airline} on {formatDisplayDate(flight.date)}
          </p>
          <p className={styles.reference}>
            Reference <strong>{reference}</strong>
          </p>
          <button type="button" className={styles.confirmButton} onClick={() => dialogRef.current?.close()}>
            Done
          </button>
        </div>
      )}
    </dialog>
  )
}
