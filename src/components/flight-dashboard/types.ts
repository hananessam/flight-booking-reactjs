export type TripType = 'one-way' | 'round-trip' | 'multi-city'

export type StopFilter = 'non-stop' | 'one-stop' | 'more-stops'

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
}

export interface FlightSegment {
  id: string
  from: string
  to: string
  date: string
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
