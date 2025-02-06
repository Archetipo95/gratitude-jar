import { mountSuspended } from '@nuxt/test-utils/runtime'
import FooterBar from './FooterBar.vue'

describe('FooterBar', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(FooterBar)

    // Check if the component renders
    expect(wrapper.exists()).toBe(true)

    // Check if the text content is correct
    expect(wrapper.text()).toContain('Made with')
    expect(wrapper.text()).toContain('by Martin')
    expect(wrapper.text()).toContain('Info & Disclamers')

    // Check if links are present and have correct href
    expect(wrapper.findComponent('[data-test="github-link"]').attributes('href')).toBe('https://github.com/Archetipo95')
    expect(wrapper.findComponent('[data-test="info-link"]').attributes('href')).toBe('/info')
  })
})
