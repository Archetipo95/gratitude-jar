import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import NavLogo from "./NavLogo.vue"

describe("navLogo", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(NavLogo)
  })

  describe("content and structure", () => {
    it("displays the application name", () => {
      expect(wrapper.text()).toContain("Gratitude Jar")
    })

    it("renders the application title as a heading", () => {
      const heading = wrapper.find("h1")
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe("Gratitude Jar")
    })

    it("includes the gratitude logo component", () => {
      const logo = wrapper.findComponent({ name: "GratitudeLogo" })
      expect(logo.exists()).toBe(true)
    })
  })

  describe("navigation behavior", () => {
    it("functions as a clickable link to the home page", () => {
      const homeLink = wrapper.find("a[href='/']")
      expect(homeLink.exists()).toBe(true)
    })

    it("wraps both logo and title in a single navigation link", () => {
      const link = wrapper.find("a")
      expect(link.exists()).toBe(true)

      // Both logo and title should be within the same link
      const logoInLink = link.findComponent({ name: "GratitudeLogo" })
      const titleInLink = link.find("h1")

      expect(logoInLink.exists()).toBe(true)
      expect(titleInLink.exists()).toBe(true)
    })

    it("can be activated by clicking anywhere on the logo area", async () => {
      const link = wrapper.find("a")

      // Should be able to click without errors
      await link.trigger("click")
      expect(link.attributes("href")).toBe("/")
    })
  })

  describe("accessibility", () => {
    it("provides a semantic heading for the application name", () => {
      const heading = wrapper.find("h1")
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBeTruthy()
    })

    it("creates a navigable home link", () => {
      const link = wrapper.find("a")
      expect(link.attributes("href")).toBe("/")
      expect(link.element.tagName.toLowerCase()).toBe("a")
    })
  })

  describe("component composition", () => {
    it("correctly integrates the GratitudeLogo component", () => {
      const logo = wrapper.findComponent({ name: "GratitudeLogo" })
      expect(logo.exists()).toBe(true)
      expect(logo.vm).toBeDefined()
    })

    it("displays logo and title together as a cohesive unit", () => {
      const logo = wrapper.findComponent({ name: "GratitudeLogo" })
      const title = wrapper.find("h1")

      expect(logo.exists()).toBe(true)
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe("Gratitude Jar")
    })
  })
})
