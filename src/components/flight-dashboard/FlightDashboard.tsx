import { useMemo, useState } from 'react'
import { DEFAULT_SEARCH, FLIGHTS } from './data'
import type { SearchCriteria, StopFilter } from './types'
import { isSameDay } from './date'
import { Sidebar } from './Sidebar'
import { SearchPanel } from './SearchPanel'
import { SearchSummary } from './SearchSummary'
import { FlightResults } from './FlightResults'
import { DetailPanel } from './DetailPanel'
import styles from './FlightDashboard.module.css'

export function FlightDashboard() {
  const [search, setSearch] = useState<SearchCriteria>(DEFAULT_SEARCH)
  const [stopFilter, setStopFilter] = useState<StopFilter>('non-stop')

  const filteredFlights = useMemo(
    () =>
      FLIGHTS.filter(
        (flight) =>
          flight.from === search.origin.code &&
          flight.to === search.destination.code &&
          flight.stops === stopFilter &&
          isSameDay(flight.date, search.departureDate) &&
          flight.availableClasses.includes(search.seatClass.id) &&
          flight.seatsAvailable >= search.travellers,
      ),
    [search, stopFilter],
  )

  return (
    <div className={styles.dashboard}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <Sidebar />

      <main className={styles.main}>
        <SearchPanel onSearch={setSearch} />

        <SearchSummary search={search} />

        <div className={styles.resultsRow}>
          <FlightResults flights={filteredFlights} />
          <DetailPanel
            origin={search.origin}
            destination={search.destination}
            stopFilter={stopFilter}
            onStopFilterChange={setStopFilter}
          />
        </div>
      </main>
    </div>
  )
}
