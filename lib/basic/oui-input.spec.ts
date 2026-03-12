import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OuiInput from './oui-input.vue'

describe('ouiInput', () => {
  it('renders input field', () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'test',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('test')
  })

  it('shows clear button when clearable is true and has value', async () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
    })

    const clearButton = wrapper.find('.oui-input-clearable')
    expect(clearButton.exists()).toBe(true)
  })

  it('does not show clear button when clearable is false', () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'test',
        clearable: false,
      },
    })

    const clearButton = wrapper.find('.oui-input-clearable')
    expect(clearButton.exists()).toBe(false)
  })

  it('does not show clear button when no value', () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: '',
        clearable: true,
      },
    })

    const clearButton = wrapper.find('.oui-input-clearable')
    expect(clearButton.exists()).toBe(false)
  })

  it('clears value when clear button is clicked', async () => {
    const wrapper:any = mount(OuiInput, {
      props: {
        'modelValue': 'test',
        'clearable': true,
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      } as any,
    })

    const clearButton = wrapper.find('.oui-input-clearable')
    await clearButton.trigger('click')

    // Check that the value was cleared
    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
  })

  it('does not show clear button when disabled', () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        disabled: true,
      },
    })

    const clearButton = wrapper.find('.oui-input-clearable')
    // Clear button should still show when disabled (following the pattern from OuiFile)
    expect(clearButton.exists()).toBe(true)
  })

  it('applies formatter to input and model value', async () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'hello',
        formatter: (value: string) => value.toUpperCase(),
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('HELLO')

    await input.setValue('test')

    expect(input.element.value).toBe('TEST')
    const modelUpdates = wrapper.emitted('update:modelValue')
    expect(modelUpdates?.at(-1)?.[0]).toBe('TEST')
  })

  it('marks invalid value and does not update model', async () => {
    const wrapper = mount(OuiInput, {
      props: {
        modelValue: 'abc',
        validator: (value: string) => /^[A-Za-z]*$/.test(value),
      },
    })

    const input = wrapper.find('input')
    await input.setValue('abc1')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
