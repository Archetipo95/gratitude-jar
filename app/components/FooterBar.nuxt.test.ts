import { mountSuspended } from '@nuxt/test-utils/runtime'
import FooterBar from './FooterBar.vue'

describe('FooterBar', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(FooterBar)

    // Check if the component renders
    expect(wrapper.exists()).toBe(true)

    // Check if the text content is correct by finding elements directly
    expect(wrapper.find('[data-test="footer-made-by"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="footer-made-by"] .font-bold').text()).toBe('Martin')
    expect(wrapper.find('[data-test="info-link"]').exists()).toBe(true)

    // Check if links are present and have correct href
    expect(wrapper.findComponent('[data-test="footer-made-by"] .font-bold').attributes('href')).toBe('https://github.com/Archetipo95')
    expect(wrapper.findComponent('[data-test="info-link"]').attributes('href')).toBe('/info')
  })
})
