import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { dayFromString } from 'zeed'
import OuiDay from './oui-day.vue'

// Mock i18n function
const mockT = (defaultText: string) => defaultText

describe('ouiDay', () => {
  it('renders with a day value', () => {
    const testDay = dayFromString('2026-02-10')!
    const wrapper = mount(OuiDay, {
      props: {
        modelValue: testDay,
      },
      global: {
        provide: {
          t: mockT,
        },
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
      global: {
        provide: {
          t: mockT,
        },
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
      global: {
        provide: {
          t: mockT,
        },
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
      },
      global: {
        provide: {
          t: mockT,
        },
      },
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
      global: {
        provide: {
          t: mockT,
        },
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
      global: {
        provide: {
          t: mockT,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
    const button = wrapper.find('.oui-button')
    expect(button.text()).toContain('Select date')
  })
})
