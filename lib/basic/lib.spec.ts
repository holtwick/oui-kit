import { describe, expect, it } from 'vitest'
import { px, rex } from './lib'

describe('px', () => {
  it('should convert number to px string', () => {
    expect(px(16)).toBe('16px')
    expect(px(0)).toBe('0px')
    expect(px(24)).toBe('24px')
  })

  it('should handle string input', () => {
    expect(px('16')).toBe('16px')
  })
})

describe('rex', () => {
  it('should convert number (as px) to rem', () => {
    expect(rex(16)).toBe('1rem')
    expect(rex(8)).toBe('0.5rem')
    expect(rex(24)).toBe('1.5rem')
    expect(rex(32)).toBe('2rem')
  })

  it('should handle zero', () => {
    expect(rex(0)).toBe('0')
  })

  it('should convert px strings to rem', () => {
    expect(rex('16px')).toBe('1rem')
    expect(rex('8px')).toBe('0.5rem')
    expect(rex('24px')).toBe('1.5rem')
    expect(rex('0px')).toBe('0')
  })

  it('should handle negative values', () => {
    expect(rex(-16)).toBe('-1rem')
    expect(rex('-16px')).toBe('-1rem')
  })

  it('should handle decimal values', () => {
    expect(rex(4)).toBe('0.25rem')
    expect(rex('4px')).toBe('0.25rem')
  })

  it('should return non-px units unchanged', () => {
    expect(rex('2rem')).toBe('2rem')
    expect(rex('1.5em')).toBe('1.5em')
    expect(rex('100%')).toBe('100%')
    expect(rex('auto')).toBe('auto')
    expect(rex('var(--spacing)')).toBe('var(--spacing)')
  })
})
