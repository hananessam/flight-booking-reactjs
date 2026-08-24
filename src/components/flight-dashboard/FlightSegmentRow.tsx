import type { FlightSegment } from './types'
import { ArrowRightIcon, CalendarIcon, CloseIcon, PinIcon } from './icons'
import fieldStyles from './fields.module.css'
import styles from './FlightSegmentRow.module.css'

interface FlightSegmentRowProps {
  readonly segment: FlightSegment
  readonly index: number
  readonly canRemove: boolean
  readonly onRemove: () => void
}

export function FlightSegmentRow({ segment, index, canRemove, onRemove }: FlightSegmentRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.index} aria-hidden="true">
        {index + 1}
      </span>

      <button type="button" className={fieldStyles.field}>
        <PinIcon className={fieldStyles.fieldIcon} />
        <span>{segment.from}</span>
      </button>

      <ArrowRightIcon className={styles.arrow} aria-hidden="true" />

      <button type="button" className={fieldStyles.field}>
        <PinIcon className={fieldStyles.fieldIcon} />
        <span>{segment.to}</span>
      </button>

      <button type="button" className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}>
        <CalendarIcon className={fieldStyles.fieldIcon} />
        <span>{segment.date}</span>
      </button>

      <button
        type="button"
        className={styles.removeButton}
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={`Remove flight ${index + 1}`}
      >
        <CloseIcon className={styles.removeIcon} />
      </button>
    </div>
  )
}
