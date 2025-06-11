import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import NavigationBar from "./NavigationBar.vue"

describe("navigationBar", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(NavigationBar)
  })

  // Helper functions using data-test-ids
  const getNavigationBar = () => wrapper.find("[data-test-id=\"navigation-bar\"]")
  const getNavContainer = () => wrapper.find("[data-test-id=\"nav-container\"]")
  const getLogoSection = () => wrapper.find("[data-test-id=\"nav-logo-section\"]")
  const getRightSection = () => wrapper.find("[data-test-id=\"nav-right-section\"]")
  const getDesktopSection = () => wrapper.find("[data-test-id=\"nav-desktop-section\"]")
  // ColorModeButton is now inside desktop section, no longer has its own section
  const getMobileSection = () => wrapper.find("[data-test-id=\"nav-mobile-section\"]")

  describe("component structure", () => {
    it("renders main navigation bar", () => {
      const navBar = getNavigationBar()
      expect(navBar.exists()).toBe(true)
    })

    it("renders navigation container", () => {
      const container = getNavContainer()
      expect(container.exists()).toBe(true)
    })

    it("renders logo section", () => {
      const logoSection = getLogoSection()
      expect(logoSection.exists()).toBe(true)
    })

    it("renders right section", () => {
      const rightSection = getRightSection()
      expect(rightSection.exists()).toBe(true)
    })

    it("renders desktop navigation section", () => {
      const desktopSection = getDesktopSection()
      expect(desktopSection.exists()).toBe(true)
      expect(desktopSection.classes()).toContain("hidden")
      expect(desktopSection.classes()).toContain("md:flex")
    })

    // ColorModeButton is now inside desktop section - no separate section test needed

    it("renders mobile section", () => {
      const mobileSection = getMobileSection()
      expect(mobileSection.exists()).toBe(true)
    })
  })

  describe("component integration", () => {
    it("renders NavLogo component in logo section", () => {
      const logoSection = getLogoSection()
      const navLogo = logoSection.findComponent({ name: "NavLogo" })
      expect(navLogo.exists()).toBe(true)
    })

    it("renders NavGreeting in desktop section", () => {
      const desktopSection = getDesktopSection()
      const navGreeting = desktopSection.findComponent({ name: "NavGreeting" })
      expect(navGreeting.exists()).toBe(true)
    })

    it("renders NavAuthButtons in desktop section", () => {
      const desktopSection = getDesktopSection()
      const navAuthButtons = desktopSection.findComponent({ name: "NavAuthButtons" })
      expect(navAuthButtons.exists()).toBe(true)
    })

    it("renders ColorModeButton in desktop section", () => {
      const desktopSection = getDesktopSection()
      const colorModeButton = desktopSection.findComponent({ name: "ColorModeButton" })
      expect(colorModeButton.exists()).toBe(true)
    })

    it("renders NavMobileMenu in mobile section", () => {
      const mobileSection = getMobileSection()
      const navMobileMenu = mobileSection.findComponent({ name: "NavMobileMenu" })
      expect(navMobileMenu.exists()).toBe(true)
    })
  })
})
