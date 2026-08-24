import { MinusIcon, PersonIcon, PlusIcon } from './icons'
import { usePopover } from './usePopover'
import fieldStyles from './fields.module.css'
import styles from './TravellerField.module.css'

const MIN_TRAVELLERS = 1
const MAX_TRAVELLERS = 9

interface TravellerFieldProps {
  readonly value: number
  readonly onChange: (count: number) => void
  readonly className?: string
}

export function TravellerField({ value, onChange, className }: TravellerFieldProps) {
  const { isOpen, toggle, containerRef } = usePopover<HTMLDivElement>()

  return (
    <div className={className ? `${styles.wrapper} ${className}` : styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <PersonIcon className={fieldStyles.fieldIcon} />
        <span>
          {value} {value === 1 ? 'traveller' : 'travellers'}
        </span>
      </button>

      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="Travellers">
          <span className={styles.label}>Travellers</span>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepButton}
              onClick={() => onChange(Math.max(MIN_TRAVELLERS, value - 1))}
              disabled={value <= MIN_TRAVELLERS}
              aria-label="Decrease travellers"
            >
              <MinusIcon className={styles.stepIcon} />
            </button>
            <span className={styles.count}>{value}</span>
            <button
              type="button"
              className={styles.stepButton}
              onClick={() => onChange(Math.min(MAX_TRAVELLERS, value + 1))}
              disabled={value >= MAX_TRAVELLERS}
              aria-label="Increase travellers"
            >
              <PlusIcon className={styles.stepIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
