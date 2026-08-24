const displayFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** A 42-cell (6-week) grid for the given month, padded with nulls so weekdays line up. */
export function getCalendarDays(monthDate: Date): (Date | null)[] {
  const first = startOfMonth(monthDate)
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
  const days: (Date | null)[] = new Array(first.getDay()).fill(null)

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day))
  }
  while (days.length < 42) {
    days.push(null)
  }
  return days
}

export function formatDisplayDate(date: Date): string {
  return displayFormatter.format(date)
}

export function formatMonthLabel(date: Date): string {
  return monthFormatter.format(date)
}
