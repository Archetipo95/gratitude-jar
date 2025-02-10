import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GratitudeLogo from './GratitudeLogo.vue'

describe('GratitudeLogo', () => {
  it('renders correctly', () => {
    const wrapper = mount(GratitudeLogo)

    // Check that the component renders an SVG element
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
