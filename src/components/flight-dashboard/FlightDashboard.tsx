import { useMemo, useState } from 'react'
import { FLIGHTS } from './data'
import type { StopFilter } from './types'
import { Sidebar } from './Sidebar'
import { SearchPanel } from './SearchPanel'
import { FlightResults } from './FlightResults'
import { DetailPanel } from './DetailPanel'
import styles from './FlightDashboard.module.css'

export function FlightDashboard() {
  const [stopFilter, setStopFilter] = useState<StopFilter>('non-stop')

  const filteredFlights = useMemo(
    () => FLIGHTS.filter((flight) => flight.stops === stopFilter),
    [stopFilter],
  )

  return (
    <div className={styles.dashboard}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <Sidebar />

      <main className={styles.main}>
        <SearchPanel />

        <div className={styles.resultsRow}>
          <FlightResults flights={filteredFlights} />
          <DetailPanel stopFilter={stopFilter} onStopFilterChange={setStopFilter} />
        </div>
      </main>
    </div>
  )
}
