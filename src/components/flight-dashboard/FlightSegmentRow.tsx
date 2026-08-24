import type { FlightSegment } from './types'
import { ArrowRightIcon, CloseIcon } from './icons'
import { CityField } from './CityField'
import { DateField } from './DateField'
import styles from './FlightSegmentRow.module.css'

interface FlightSegmentRowProps {
  readonly segment: FlightSegment
  readonly index: number
  readonly canRemove: boolean
  readonly onRemove: () => void
  readonly onChange: (segment: FlightSegment) => void
}

export function FlightSegmentRow({ segment, index, canRemove, onRemove, onChange }: FlightSegmentRowProps) {
  return (
    <div className={`${styles.row} flex-col items-stretch gap-2 md:flex-row md:items-center`}>
      <span className={styles.index} aria-hidden="true">
        {index + 1}
      </span>

      <CityField
        value={segment.from}
        onChange={(from) => onChange({ ...segment, from })}
        excludeCode={segment.to?.code}
        ariaLabel={`Flight ${index + 1} origin`}
        placeholder="Select origin"
      />

      <ArrowRightIcon className={styles.arrow} aria-hidden="true" />

      <CityField
        value={segment.to}
        onChange={(to) => onChange({ ...segment, to })}
        excludeCode={segment.from?.code}
        ariaLabel={`Flight ${index + 1} destination`}
        placeholder="Select destination"
      />

      <DateField value={segment.date} onChange={(date) => onChange({ ...segment, date })} />

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
