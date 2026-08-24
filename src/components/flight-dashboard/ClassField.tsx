import { SEAT_CLASSES } from './data'
import type { SeatClassOption } from './types'
import { ChevronDownIcon, SeatClassIcon } from './icons'
import { usePopover } from './usePopover'
import fieldStyles from './fields.module.css'
import styles from './ClassField.module.css'

interface ClassFieldProps {
  readonly value: SeatClassOption
  readonly onChange: (seatClass: SeatClassOption) => void
}

export function ClassField({ value, onChange }: ClassFieldProps) {
  const { isOpen, toggle, close, containerRef } = usePopover<HTMLDivElement>()

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Ticket class"
        onClick={toggle}
      >
        <SeatClassIcon className={fieldStyles.fieldIcon} />
        <span>{value.label}</span>
        <ChevronDownIcon className={styles.chevron} />
      </button>

      {isOpen && (
        <ul className={styles.panel} role="listbox" aria-label="Ticket class">
          {SEAT_CLASSES.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                role="option"
                aria-selected={value.id === option.id}
                className={styles.option}
                data-selected={value.id === option.id}
                onClick={() => {
                  onChange(option)
                  close()
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
