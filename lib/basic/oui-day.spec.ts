import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { dayFromString } from 'zeed'
import OuiDay from './oui-day.vue'
import { dayValidator } from './oui-day.lib'

// Mock i18n function
const mockT = (defaultText: string) => defaultText

describe('ouiDay', () => {
  it('renders with a day value', () => {
    const testDay = dayFromString('2026-02-10')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: testDay,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('displays formatted date', () => {
    const testDay = dayFromString('2026-02-10')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: testDay,
      },
    })

    const button = wrapper.find('.oui-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('02/10/2026')
  })

  it('accepts title and description props', () => {
    const testDay = dayFromString('2026-02-10')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: testDay,
        title: 'Select a Date',
        description: 'Choose your preferred date',
      },
    })

    expect(wrapper.text()).toContain('Select a Date')
    expect(wrapper.text()).toContain('Choose your preferred date')
  })

  it('shows input field when editable is true', () => {
    const testDay = dayFromString('2026-02-10')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: testDay,
        editable: true,
      }
    })

    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
  })

  it('shows placeholder when day is undefined and placeholderDay is set', () => {
    const placeholderDay = dayFromString('2026-01-01')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: undefined,
        placeholderDay,
      },

    })

    const button = wrapper.find('.oui-button')
    expect(button.text()).toContain('01/01/2026')
  })

  it('accepts undefined day value', () => {
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: undefined,
      },
    })

    expect(wrapper.exists()).toBe(true)
    const button = wrapper.find('.oui-button')
    expect(button.text()).toContain('Select date')
  })
})

describe('dayValidator', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 1, 10, 12, 0, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('parses day-month-year input', () => {
    const result = dayValidator('2.10.26')

    expect(result).toBe(dayFromString('2026-10-02'))
  })

  it('parses month-day-year input in usa mode', () => {
    const result = dayValidator('12/25/26', true)

    expect(result).toBe(dayFromString('2026-12-25'))
  })

  it('rolls back to previous year for far future dates', () => {
    const result = dayValidator('25.12')

    expect(result).toBe(dayFromString('2025-12-25'))
  })

   it('rolls back to previous year for far future dates', () => {
    const result = dayValidator('8.8')

    expect(result).toBe(dayFromString('2025-08-08'))
  })

  it('returns undefined for empty input', () => {
    const result = dayValidator('')

    expect(result).toBe(undefined)
  })
})
