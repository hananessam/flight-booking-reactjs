import type { PriceRange } from './types'
import styles from './PriceRangeSlider.module.css'

interface PriceRangeSliderProps {
  readonly min: number
  readonly max: number
  readonly step: number
  readonly value: PriceRange
  readonly onChange: (value: PriceRange) => void
}

export function PriceRangeSlider({ min, max, step, value, onChange }: PriceRangeSliderProps) {
  const [low, high] = value
  const lowPercent = ((low - min) / (max - min)) * 100
  const highPercent = ((high - min) / (max - min)) * 100

  function handleLowChange(next: number) {
    onChange([Math.min(next, high - step), high])
  }

  function handleHighChange(next: number) {
    onChange([low, Math.max(next, low + step)])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.trackFill} style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }} />
      </div>

      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(event) => handleLowChange(Number(event.target.value))}
        aria-label="Minimum price"
      />
      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(event) => handleHighChange(Number(event.target.value))}
        aria-label="Maximum price"
      />
    </div>
  )
}
