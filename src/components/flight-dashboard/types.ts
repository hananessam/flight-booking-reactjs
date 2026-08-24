export type TripType = 'one-way' | 'round-trip' | 'multi-city'

export type StopFilter = 'non-stop' | 'one-stop' | 'more-stops'

export type PriceRange = readonly [min: number, max: number]

export interface Flight {
  id: string
  airline: string
  from: string
  fromTime: string
  to: string
  toTime: string
  duration: string
  stops: StopFilter
  price: number
  date: Date
  availableClasses: SeatClassId[]
  seatsAvailable: number
}

export interface CityOption {
  code: string
  city: string
}

export interface FlightSegment {
  id: string
  from: CityOption | null
  to: CityOption | null
  date: Date | null
}

export type SeatClassId = 'economy' | 'premium-economy' | 'business' | 'first-class'

export interface SeatClassOption {
  id: SeatClassId
  label: string
}

export interface SearchCriteria {
  tripType: TripType
  origin: CityOption
  destination: CityOption
  departureDate: Date
  returnDate: Date | null
  travellers: number
  seatClass: SeatClassOption
  /** Populated only when tripType is 'multi-city'; empty otherwise. */
  segments: FlightSegment[]
}

export interface NavItem {
  id: string
  label: string
}

export interface ActiveUser {
  id: string
  initial: string
  color: string
}
