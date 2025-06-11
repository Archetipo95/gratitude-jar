import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import NavMobileMenu from "./NavMobileMenu.vue"

describe("navMobileMenu", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(NavMobileMenu)
  })

  // Helper functions using data-test-ids
  const getMobileMenu = () => wrapper.find("[data-test-id=\"nav-mobile-menu\"]")
  const getHamburgerButton = () => wrapper.find("[data-test-id=\"hamburger-button\"]")
  const getMenuContent = () => wrapper.find("[data-test-id=\"mobile-menu-content\"]")
  const getMenuInner = () => wrapper.find("[data-test-id=\"mobile-menu-inner\"]")
  const getAuthContainer = () => wrapper.find("[data-test-id=\"mobile-auth-container\"]")

  describe("component structure", () => {
    it("renders mobile menu container", () => {
      const mobileMenu = getMobileMenu()
      expect(mobileMenu.exists()).toBe(true)
      expect(mobileMenu.classes()).toContain("md:hidden")
    })

    it("renders hamburger button with correct attributes", () => {
      const button = getHamburgerButton()
      expect(button.exists()).toBe(true)
      expect(button.attributes("aria-label")).toBe("Toggle mobile menu")
      // It's now a UButton component
      expect(button.element.tagName.toLowerCase()).toBe("button")
    })

    it("renders menu content container when closed", () => {
      const content = getMenuContent()
      // Menu starts closed, so content should not exist initially
      expect(content.exists()).toBe(false)
    })
  })

  describe("menu functionality", () => {
    it("opens menu when button is clicked", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const content = getMenuContent()
      expect(content.exists()).toBe(true)
    })

    it("has correct inner menu padding and spacing when open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const inner = getMenuInner()
      expect(inner.exists()).toBe(true)
      expect(inner.classes()).toContain("p-6")
      expect(inner.classes()).toContain("space-y-4")
    })
  })

  describe("component integration", () => {
    it("renders NavGreeting when menu is open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const navGreeting = wrapper.findComponent({ name: "NavGreeting" })
      expect(navGreeting.exists()).toBe(true)
    })

    it("renders NavAuthButtons when menu is open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const authContainer = getAuthContainer()
      expect(authContainer.exists()).toBe(true)

      const navAuthButtons = authContainer.findComponent({ name: "NavAuthButtons" })
      expect(navAuthButtons.exists()).toBe(true)
    })

    it("renders ColorModeButton in mobile menu when open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const colorModeButton = wrapper.findComponent({ name: "ColorModeButton" })
      expect(colorModeButton.exists()).toBe(true)
    })
  })
})
