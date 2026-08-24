import { Sidebar } from './Sidebar'
import { SearchPanel } from './SearchPanel'
import { FlightResults } from './FlightResults'
import { DetailPanel } from './DetailPanel'
import styles from './FlightDashboard.module.css'

export function FlightDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <Sidebar />

      <main className={styles.main}>
        <SearchPanel />

        <div className={styles.resultsRow}>
          <FlightResults />
          <DetailPanel />
        </div>
      </main>
    </div>
  )
}
