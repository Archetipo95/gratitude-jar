import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from './FooterBar.vue'

describe('Footer', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(Footer)
  })

  // Helper functions to get elements by data-test attributes
  const findFooterText = (wrapper: VueWrapper) => wrapper.find('[data-test="footer-made-by"]')
  const findHeartIcon = (wrapper: VueWrapper) => wrapper.find('[data-test="heart-icon"]')
  const findGithubLink = (wrapper: VueWrapper) => wrapper.find('[data-test="github-link"]')
  const findInfoLink = (wrapper: VueWrapper) => wrapper.find('[data-test="info-link"]')

  it('renders "Made by" text correctly', () => {
    const footerText = findFooterText(wrapper)

    expect(footerText.exists()).toBe(true)
    expect(footerText.text()).toContain('Made with')
  })

  it('renders heart icon correctly', () => {
    const heartIcon = findHeartIcon(wrapper)

    expect(heartIcon.exists()).toBe(true)
    expect(heartIcon.classes()).toContain('text-red-600')
  })

  it('renders GitHub link correctly', () => {
    const githubLink = findGithubLink(wrapper)

    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/Archetipo95')
    expect(githubLink.text()).toBe('Martin')
  })

  it('renders Info link correctly', () => {
    const infoLink = findInfoLink(wrapper)

    expect(infoLink.exists()).toBe(true)
    expect(infoLink.text()).toContain('Info & Disclaimers')
  })
})
