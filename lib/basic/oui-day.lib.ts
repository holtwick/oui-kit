import type { DayValue } from 'zeed'
import { dayFromToday } from 'zeed'

export const today = dayFromToday()

export function dayMaxToday(day: DayValue, maxToday = true): DayValue {
  return maxToday ? Math.min(day, today) : day
}
