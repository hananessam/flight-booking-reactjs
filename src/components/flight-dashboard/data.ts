import type {
  ActiveUser,
  CityOption,
  Flight,
  FlightSegment,
  NavItem,
  PriceRange,
  SearchCriteria,
  SeatClassOption,
  TripType,
} from './types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'flights', label: 'Flights', path: '/flights' },
  { id: 'wallet', label: 'Wallet', path: '/wallet' },
  { id: 'reports', label: 'Reports', path: '/reports' },
  { id: 'statistics', label: 'Statistics', path: '/statistics' },
  { id: 'settings', label: 'Settings', path: '/settings' },
]

export const PLACEHOLDER_PAGES: { path: string; title: string; description: string }[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    description: 'An overview of your account activity will live here soon.',
  },
  {
    path: '/wallet',
    title: 'Wallet',
    description: 'Manage saved cards and travel credit from this page soon.',
  },
  {
    path: '/reports',
    title: 'Reports',
    description: 'Download trip and spending reports from this page soon.',
  },
  {
    path: '/statistics',
    title: 'Statistics',
    description: 'Visualize your travel history and spending trends here soon.',
  },
  {
    path: '/settings',
    title: 'Settings',
    description: 'Update your profile, preferences and notifications here soon.',
  },
]

export const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: 'one-way', label: 'One way' },
  { id: 'round-trip', label: 'Round trip' },
  { id: 'multi-city', label: 'Multi city' },
]

export const ACTIVE_USERS: ActiveUser[] = [
  { id: 'u1', initial: 'M', color: '#c97b63' },
  { id: 'u2', initial: 'R', color: '#7b93c9' },
  { id: 'u3', initial: 'S', color: '#6ea98a' },
  { id: 'u4', initial: 'L', color: '#c9a15c' },
]

export const ACTIVE_USERS_OVERFLOW = 70

export const CITIES: CityOption[] = [
  { code: 'JFK', city: 'New York', lat: 40.64, lon: -73.78 },
  { code: 'BOM', city: 'Mumbai', lat: 19.09, lon: 72.87 },
  { code: 'LHR', city: 'London', lat: 51.47, lon: -0.45 },
  { code: 'DXB', city: 'Dubai', lat: 25.25, lon: 55.36 },
  { code: 'SIN', city: 'Singapore', lat: 1.35, lon: 103.99 },
  { code: 'CDG', city: 'Paris', lat: 49.0, lon: 2.55 },
  { code: 'HND', city: 'Tokyo', lat: 35.55, lon: 139.78 },
  { code: 'SYD', city: 'Sydney', lat: -33.95, lon: 151.18 },
  { code: 'FRA', city: 'Frankfurt', lat: 50.03, lon: 8.57 },
  { code: 'DOH', city: 'Doha', lat: 25.27, lon: 51.61 },
]

export const SEAT_CLASSES: SeatClassOption[] = [
  { id: 'economy', label: 'Economy' },
  { id: 'premium-economy', label: 'Premium economy' },
  { id: 'business', label: 'Business' },
  { id: 'first-class', label: 'First class' },
]

export const DEFAULT_SEAT_CLASS: SeatClassOption = SEAT_CLASSES[3]

export const DEFAULT_ORIGIN: CityOption = CITIES[0]
export const DEFAULT_DESTINATION: CityOption = CITIES[1]
export const DEFAULT_DEPARTURE_DATE = new Date(2019, 6, 29)
export const DEFAULT_RETURN_DATE = new Date(2019, 7, 5)

export const PRICE_RANGE = { min: 400, max: 2100, step: 50 }
export const DEFAULT_PRICE_RANGE: PriceRange = [PRICE_RANGE.min, PRICE_RANGE.max]

export const DEFAULT_SEARCH: SearchCriteria = {
  tripType: 'one-way',
  origin: DEFAULT_ORIGIN,
  destination: DEFAULT_DESTINATION,
  departureDate: DEFAULT_DEPARTURE_DATE,
  returnDate: null,
  travellers: 2,
  seatClass: DEFAULT_SEAT_CLASS,
  segments: [],
}

export const DEFAULT_SEGMENTS: FlightSegment[] = [
  { id: 'seg-1', from: DEFAULT_ORIGIN, to: DEFAULT_DESTINATION, date: DEFAULT_DEPARTURE_DATE },
  { id: 'seg-2', from: DEFAULT_DESTINATION, to: DEFAULT_ORIGIN, date: DEFAULT_RETURN_DATE },
]

export function createEmptySegment(): FlightSegment {
  return {
    id: crypto.randomUUID(),
    from: null,
    to: null,
    date: null,
  }
}

const ALL_CLASSES: SeatClassOption['id'][] = ['economy', 'premium-economy', 'business', 'first-class']

export const FLIGHTS: Flight[] = [
  {
    id: 'fl-1',
    airline: 'Emirates',
    from: 'JFK',
    fromTime: '13:00',
    to: 'BOM',
    toTime: '14:20',
    duration: '11h 20m',
    stops: 'non-stop',
    price: 1572,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 4,
  },
  {
    id: 'fl-2',
    airline: 'Qatar Airways',
    from: 'JFK',
    fromTime: '13:00',
    to: 'BOM',
    toTime: '14:20',
    duration: '11h 20m',
    stops: 'non-stop',
    price: 2072,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 6,
  },
  {
    id: 'fl-3',
    airline: 'Lufthansa',
    from: 'JFK',
    fromTime: '09:40',
    to: 'BOM',
    toTime: '23:50',
    duration: '14h 10m',
    stops: 'one-stop',
    price: 1288,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'premium-economy', 'business'],
    seatsAvailable: 5,
  },
  {
    id: 'fl-4',
    airline: 'Emirates',
    from: 'JFK',
    fromTime: '21:15',
    to: 'BOM',
    toTime: '11:35',
    duration: '14h 20m',
    stops: 'one-stop',
    price: 1345,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 2,
  },
  {
    id: 'fl-5',
    airline: 'Etihad Airways',
    from: 'JFK',
    fromTime: '06:05',
    to: 'BOM',
    toTime: '02:50',
    duration: '20h 45m',
    stops: 'more-stops',
    price: 1042,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'premium-economy'],
    seatsAvailable: 9,
  },
  {
    id: 'fl-6',
    airline: 'British Airways',
    from: 'JFK',
    fromTime: '18:30',
    to: 'BOM',
    toTime: '17:05',
    duration: '22h 35m',
    stops: 'more-stops',
    price: 986,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy'],
    seatsAvailable: 9,
  },

  // JFK -> LHR
  {
    id: 'fl-7',
    airline: 'British Airways',
    from: 'JFK',
    fromTime: '21:15',
    to: 'LHR',
    toTime: '04:30',
    duration: '7h 15m',
    stops: 'non-stop',
    price: 612,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 6,
  },
  {
    id: 'fl-8',
    airline: 'Virgin Atlantic',
    from: 'JFK',
    fromTime: '22:40',
    to: 'LHR',
    toTime: '05:50',
    duration: '7h 10m',
    stops: 'non-stop',
    price: 745,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 3,
  },
  {
    id: 'fl-9',
    airline: 'American Airlines',
    from: 'JFK',
    fromTime: '11:25',
    to: 'LHR',
    toTime: '21:10',
    duration: '9h 45m',
    stops: 'one-stop',
    price: 489,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'premium-economy', 'business'],
    seatsAvailable: 8,
  },

  // LHR -> JFK
  {
    id: 'fl-10',
    airline: 'British Airways',
    from: 'LHR',
    fromTime: '09:15',
    to: 'JFK',
    toTime: '17:05',
    duration: '7h 50m',
    stops: 'non-stop',
    price: 598,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 5,
  },
  {
    id: 'fl-11',
    airline: 'Delta',
    from: 'LHR',
    fromTime: '14:30',
    to: 'JFK',
    toTime: '23:40',
    duration: '9h 10m',
    stops: 'one-stop',
    price: 432,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'business'],
    seatsAvailable: 7,
  },

  // JFK -> DXB
  {
    id: 'fl-12',
    airline: 'Emirates',
    from: 'JFK',
    fromTime: '22:15',
    to: 'DXB',
    toTime: '10:40',
    duration: '12h 25m',
    stops: 'non-stop',
    price: 1180,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 4,
  },
  {
    id: 'fl-13',
    airline: 'Etihad Airways',
    from: 'JFK',
    fromTime: '09:00',
    to: 'DXB',
    toTime: '23:15',
    duration: '14h 15m',
    stops: 'one-stop',
    price: 890,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'premium-economy', 'business'],
    seatsAvailable: 9,
  },

  // DXB -> SIN
  {
    id: 'fl-14',
    airline: 'Emirates',
    from: 'DXB',
    fromTime: '02:10',
    to: 'SIN',
    toTime: '09:35',
    duration: '7h 25m',
    stops: 'non-stop',
    price: 520,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 6,
  },

  // JFK -> SIN
  {
    id: 'fl-15',
    airline: 'Singapore Airlines',
    from: 'JFK',
    fromTime: '21:35',
    to: 'SIN',
    toTime: '16:00',
    duration: '18h 25m',
    stops: 'non-stop',
    price: 1450,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 3,
  },
  {
    id: 'fl-16',
    airline: 'United',
    from: 'JFK',
    fromTime: '07:50',
    to: 'SIN',
    toTime: '07:20',
    duration: '23h 30m',
    stops: 'more-stops',
    price: 875,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'premium-economy'],
    seatsAvailable: 9,
  },

  // CDG -> HND
  {
    id: 'fl-17',
    airline: 'Air France',
    from: 'CDG',
    fromTime: '13:20',
    to: 'HND',
    toTime: '00:40',
    duration: '11h 20m',
    stops: 'non-stop',
    price: 690,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 5,
  },
  {
    id: 'fl-18',
    airline: 'ANA',
    from: 'CDG',
    fromTime: '10:45',
    to: 'HND',
    toTime: '22:10',
    duration: '11h 25m',
    stops: 'non-stop',
    price: 730,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 4,
  },

  // SYD -> DXB
  {
    id: 'fl-19',
    airline: 'Qantas',
    from: 'SYD',
    fromTime: '17:05',
    to: 'DXB',
    toTime: '05:50',
    duration: '12h 45m',
    stops: 'one-stop',
    price: 980,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ['economy', 'business', 'first-class'],
    seatsAvailable: 6,
  },

  // FRA -> DOH
  {
    id: 'fl-20',
    airline: 'Lufthansa',
    from: 'FRA',
    fromTime: '21:10',
    to: 'DOH',
    toTime: '03:35',
    duration: '6h 25m',
    stops: 'non-stop',
    price: 410,
    date: DEFAULT_DEPARTURE_DATE,
    availableClasses: ALL_CLASSES,
    seatsAvailable: 8,
  },
]
