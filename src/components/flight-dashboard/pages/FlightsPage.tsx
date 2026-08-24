import { useMemo, useState } from 'react'
import { DEFAULT_PRICE_RANGE, DEFAULT_SEARCH, FLIGHTS } from '../data'
import type { PriceRange, SearchCriteria, StopFilter } from '../types'
import { isSameDay } from '../date'
import { SearchPanel } from '../SearchPanel'
import { SearchSummary } from '../SearchSummary'
import { FlightResults } from '../FlightResults'
import { DetailPanel } from '../DetailPanel'
import styles from './FlightsPage.module.css'

export function FlightsPage() {
  const [search, setSearch] = useState<SearchCriteria>(DEFAULT_SEARCH)
  const [stopFilter, setStopFilter] = useState<StopFilter>('non-stop')
  const [priceRange, setPriceRange] = useState<PriceRange>(DEFAULT_PRICE_RANGE)

  const filteredFlights = useMemo(
    () =>
      FLIGHTS.filter(
        (flight) =>
          flight.from === search.origin.code &&
          flight.to === search.destination.code &&
          flight.stops === stopFilter &&
          isSameDay(flight.date, search.departureDate) &&
          flight.availableClasses.includes(search.seatClass.id) &&
          flight.seatsAvailable >= search.travellers &&
          flight.price >= priceRange[0] &&
          flight.price <= priceRange[1],
      ),
    [search, stopFilter, priceRange],
  )

  return (
    <>
      <SearchPanel onSearch={setSearch} />

      <SearchSummary search={search} />

      <div className={styles.resultsRow}>
        <FlightResults flights={filteredFlights} />
        <DetailPanel
          origin={search.origin}
          destination={search.destination}
          stopFilter={stopFilter}
          onStopFilterChange={setStopFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
      </div>
    </>
  )
}
