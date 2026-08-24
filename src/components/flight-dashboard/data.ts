import type { ActiveUser, Flight, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'flights', label: 'Flights' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'reports', label: 'Reports' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'settings', label: 'Settings' },
]

export const ACTIVE_USERS: ActiveUser[] = [
  { id: 'u1', initial: 'M', color: '#c97b63' },
  { id: 'u2', initial: 'R', color: '#7b93c9' },
  { id: 'u3', initial: 'S', color: '#6ea98a' },
  { id: 'u4', initial: 'L', color: '#c9a15c' },
]

export const ACTIVE_USERS_OVERFLOW = 70

/** Total matching results reported by search, independent of how many are rendered below. */
export const TOTAL_RESULTS = 25

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
  },
  {
    id: 'fl-3',
    airline: 'Lufthansa',
    from: 'JFK',
    fromTime: '13:00',
    to: 'BOM',
    toTime: '14:20',
    duration: '11h 20m',
    stops: 'non-stop',
    price: 1872,
  },
  {
    id: 'fl-4',
    airline: 'Emirates',
    from: 'JFK',
    fromTime: '13:00',
    to: 'BOM',
    toTime: '14:20',
    duration: '11h 20m',
    stops: 'non-stop',
    price: 1872,
  },
]
