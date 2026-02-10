export function px(value: number | string): string {
  return `${value}px`
}

/**
 * Convert px values to rem units.
 * A special opinionated measurement inspired by Stylus "rex".
 * We assume that 1rem == 16px, so 1rex == 0.0625rem.
 * The advantage is that sizes nicely scale to different default font sizes.
 *
 * @param value - Number (treated as px) or string with unit
 * @returns Value converted to rem, or original string if it already has a unit
 *
 * @example
 * rex(16) // '1rem'
 * rex(8) // '0.5rem'
 * rex('24px') // '1.5rem'
 * rex('2rem') // '2rem' (unchanged)
 * rex(0) // '0'
 */
export function rex(value: number | string): string {
  if (typeof value === 'number') {
    if (value === 0) {
      return '0'
    }
    return `${value * 0.0625}rem`
  }

  if (typeof value === 'string') {
    // If it ends with 'px', convert to rem
    const pxMatch = value.match(/^(-?\d+(?:\.\d+)?)px$/)
    if (pxMatch) {
      const numValue = Number.parseFloat(pxMatch[1])
      if (numValue === 0) {
        return '0'
      }
      return `${numValue * 0.0625}rem`
    }
    // Return other units unchanged
    return value
  }

  return String(value)
}
