import { useState } from 'react'
import {
  WEEKDAY_LABELS,
  addMonths,
  formatDisplayDate,
  formatMonthLabel,
  getCalendarDays,
  isSameDay,
  startOfMonth,
} from './date'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons'
import { usePopover } from './usePopover'
import fieldStyles from './fields.module.css'
import styles from './DateField.module.css'

interface DateFieldProps {
  readonly value: Date | null
  readonly onChange: (date: Date) => void
  readonly placeholder?: string
}

export function DateField({ value, onChange, placeholder = 'Select date' }: DateFieldProps) {
  const { isOpen, toggle, close, containerRef } = usePopover<HTMLDivElement>()
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(value ?? new Date()))

  function handleToggle() {
    if (!isOpen) setViewMonth(startOfMonth(value ?? new Date()))
    toggle()
  }

  const days = getCalendarDays(viewMonth)

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={`${fieldStyles.field} ${fieldStyles.fieldFixed}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <CalendarIcon className={fieldStyles.fieldIcon} />
        <span>{value ? formatDisplayDate(value) : placeholder}</span>
      </button>

      {isOpen && (
        <div className={styles.calendar} role="dialog" aria-label="Choose a date">
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Previous month"
              onClick={() => setViewMonth((month) => addMonths(month, -1))}
            >
              <ChevronLeftIcon className={styles.navIcon} />
            </button>
            <span className={styles.monthLabel}>{formatMonthLabel(viewMonth)}</span>
            <button
              type="button"
              className={styles.navButton}
              aria-label="Next month"
              onClick={() => setViewMonth((month) => addMonths(month, 1))}
            >
              <ChevronRightIcon className={styles.navIcon} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((day, index) =>
              day ? (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={styles.day}
                  data-selected={value ? isSameDay(day, value) : false}
                  onClick={() => {
                    onChange(day)
                    close()
                  }}
                >
                  {day.getDate()}
                </button>
              ) : (
                <span key={`blank-${index}`} className={styles.dayBlank} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
