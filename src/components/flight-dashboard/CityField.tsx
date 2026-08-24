import { CITIES } from './data'
import type { CityOption } from './types'
import { PinIcon } from './icons'
import { usePopover } from './usePopover'
import fieldStyles from './fields.module.css'
import styles from './CityField.module.css'

interface CityFieldProps {
  readonly value: CityOption | null
  readonly onChange: (city: CityOption) => void
  readonly excludeCode?: string
  readonly ariaLabel: string
  readonly placeholder?: string
}

export function CityField({ value, onChange, excludeCode, ariaLabel, placeholder = 'Select city' }: CityFieldProps) {
  const { isOpen, toggle, close, containerRef } = usePopover<HTMLDivElement>()
  const options = CITIES.filter((option) => option.code !== excludeCode)

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={fieldStyles.field}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={toggle}
      >
        <PinIcon className={fieldStyles.fieldIcon} />
        <span>{value ? `${value.city} (${value.code})` : placeholder}</span>
      </button>

      {isOpen && (
        <ul className={styles.panel} role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={value?.code === option.code}
                className={styles.option}
                data-selected={value?.code === option.code}
                onClick={() => {
                  onChange(option)
                  close()
                }}
              >
                <span className={styles.optionCity}>{option.city}</span>
                <span className={styles.optionCode}>{option.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
