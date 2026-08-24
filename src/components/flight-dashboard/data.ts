import type { ActiveUser, Flight, FlightSegment, NavItem } from './types'

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

export const DEFAULT_SEGMENTS: FlightSegment[] = [
  { id: 'seg-1', from: 'New York (JFK)', to: 'Mumbai (BOM)', date: '29 July 2019' },
  { id: 'seg-2', from: 'Mumbai (BOM)', to: 'New York (JFK)', date: '5 August 2019' },
]

export function createEmptySegment(): FlightSegment {
  return {
    id: crypto.randomUUID(),
    from: 'Select origin',
    to: 'Select destination',
    date: 'Select date',
  }
}

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
    fromTime: '09:40',
    to: 'BOM',
    toTime: '23:50',
    duration: '14h 10m',
    stops: 'one-stop',
    price: 1288,
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
  },
]
