import styles from './PlaceholderPage.module.css'

interface PlaceholderPageProps {
  readonly title: string
  readonly description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>Coming soon</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
