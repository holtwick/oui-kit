import type { DayValue } from 'zeed'
import { dayDiff, dayFromDate, dayFromString } from 'zeed'

const shortDateRegex = /^(\d{1,2})(?:[\s,\\'`./-]+(\d{1,2})(?:[\s,\\'`./-]+(\d{1,4}))?)?/

function dayDiffFromNow(candidate: Date, now: Date): number {
  return dayDiff(dayFromDate(candidate), dayFromDate(now))
}

export function dayValidator(text: string, usaMode = false): DayValue | undefined {
  if (!text) {
    return undefined
  }

  const trimmed = text.trim()
  if (!trimmed) {
    return undefined
  }

  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      const parsed = dayFromString(trimmed)
      if (parsed !== undefined) {
        return parsed
      }
    }

    if (/[a-z]/i.test(trimmed)) {
      const directDate = new Date(trimmed)
      if (!Number.isNaN(directDate.getTime())) {
        return dayFromDate(directDate)
      }
    }

    shortDateRegex.lastIndex = 0
    const match = shortDateRegex.exec(trimmed)
    if (!match) {
      return undefined
    }

    const now = new Date()
    const left = Number.parseInt(match[1] ?? '0', 10) || 0
    const right = Number.parseInt(match[2] ?? '0', 10) || 0
    let year = Number.parseInt(match[3] ?? '0', 10) || 0

    if (year > 0 && year <= 100) {
      const in20years = (now.getFullYear() % 100) + 20
      const currentCentury = Math.floor(now.getFullYear() / 100) * 100
      year = year > in20years ? year + currentCentury - 100 : year + currentCentury
    }

    if (left <= 0) {
      return undefined
    }

    if (right === 0) {
      const date = new Date(now.getFullYear(), now.getMonth(), left, 12, 0, 0, 0)
      return dayFromDate(date)
    }

    const day = usaMode ? right : left
    const month = usaMode ? left : right

    if (year > 0) {
      const date = new Date(year, month - 1, day, 12, 0, 0, 0)
      return dayFromDate(date)
    }

    let date = new Date(now.getFullYear(), month - 1, day, 12, 0, 0, 0)
    if (dayDiffFromNow(date, now) < -7) {
      date = new Date(now.getFullYear() - 1, month - 1, day, 12, 0, 0, 0)
    }

    return dayFromDate(date)
  }
  catch {
    return undefined
  }
}
