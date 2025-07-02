import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import AppNavbarMobileMenu from "./AppNavbarMobileMenu.vue"

describe("appNavbarMobileMenu", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(AppNavbarMobileMenu)
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
    it("renders AppNavbarGreeting when menu is open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const AppNavbarGreeting = wrapper.findComponent({ name: "AppNavbarGreeting" })
      expect(AppNavbarGreeting.exists()).toBe(true)
    })

    it("renders AppNavbarAuthButtons when menu is open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const authContainer = getAuthContainer()
      expect(authContainer.exists()).toBe(true)

      const AppNavbarAuthButtons = authContainer.findComponent({ name: "AppNavbarAuthButtons" })
      expect(AppNavbarAuthButtons.exists()).toBe(true)
    })

    it("renders AppThemeButton in mobile menu when open", async () => {
      const button = getHamburgerButton()
      await button.trigger("click")

      const AppThemeButton = wrapper.findComponent({ name: "AppThemeButton" })
      expect(AppThemeButton.exists()).toBe(true)
    })
  })
})
