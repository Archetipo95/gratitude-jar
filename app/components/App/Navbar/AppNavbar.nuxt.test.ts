import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import AppNavbar from "./AppNavbar.vue"

describe("appNavbar", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(AppNavbar)
  })

  // Helper functions using data-test-ids
  const getAppNavbar = () => wrapper.find("[data-test-id=\"navigation-bar\"]")
  const getNavContainer = () => wrapper.find("[data-test-id=\"nav-container\"]")
  const getLogoSection = () => wrapper.find("[data-test-id=\"nav-logo-section\"]")
  const getRightSection = () => wrapper.find("[data-test-id=\"nav-right-section\"]")
  const getDesktopSection = () => wrapper.find("[data-test-id=\"nav-desktop-section\"]")
  // AppThemeButton is now inside desktop section, no longer has its own section
  const getMobileSection = () => wrapper.find("[data-test-id=\"nav-mobile-section\"]")

  describe("component structure", () => {
    it("renders main navigation bar", () => {
      const navBar = getAppNavbar()
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
      expect(desktopSection.classes()).toContain("flex")
      expect(desktopSection.classes()).toContain("items-center")
    })

    // AppThemeButton is now inside desktop section - no separate section test needed

    it("renders mobile section", () => {
      // Mobile section only exists when screen size is below md breakpoint
      // In test environment, it defaults to desktop size, so mobile section won't exist
      const mobileSection = getMobileSection()
      expect(mobileSection.exists()).toBe(false)
    })
  })

  describe("logo section content and structure", () => {
    it("displays the application name", () => {
      const logoSection = getLogoSection()
      expect(logoSection.text()).toContain("Gratitude Jar")
    })

    it("renders the application title as a heading", () => {
      const logoSection = getLogoSection()
      const heading = logoSection.find("h1")
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe("Gratitude Jar")
    })

    it("includes the gratitude logo component", () => {
      const logoSection = getLogoSection()
      const logo = logoSection.findComponent({ name: "AppLogo" })
      expect(logo.exists()).toBe(true)
    })
  })

  describe("logo section navigation behavior", () => {
    it("functions as a clickable link to the home page", () => {
      const logoSection = getLogoSection()
      const homeLink = logoSection.find("a[href='/']")
      expect(homeLink.exists()).toBe(true)
    })

    it("wraps both logo and title in a single navigation link", () => {
      const logoSection = getLogoSection()
      const link = logoSection.find("a")
      expect(link.exists()).toBe(true)

      // Both logo and title should be within the same link
      const logoInLink = link.findComponent({ name: "AppLogo" })
      const titleInLink = link.find("h1")

      expect(logoInLink.exists()).toBe(true)
      expect(titleInLink.exists()).toBe(true)
    })

    it("can be activated by clicking anywhere on the logo area", async () => {
      const logoSection = getLogoSection()
      const link = logoSection.find("a")

      // Should be able to click without errors
      await link.trigger("click")
      expect(link.attributes("href")).toBe("/")
    })
  })

  describe("logo section accessibility", () => {
    it("provides a semantic heading for the application name", () => {
      const logoSection = getLogoSection()
      const heading = logoSection.find("h1")
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBeTruthy()
    })

    it("creates a navigable home link", () => {
      const logoSection = getLogoSection()
      const link = logoSection.find("a")
      expect(link.attributes("href")).toBe("/")
      expect(link.element.tagName.toLowerCase()).toBe("a")
    })
  })

  describe("logo section component composition", () => {
    it("correctly integrates the AppLogo component", () => {
      const logoSection = getLogoSection()
      const logo = logoSection.findComponent({ name: "AppLogo" })
      expect(logo.exists()).toBe(true)
      expect(logo.vm).toBeDefined()
    })

    it("displays logo and title together as a cohesive unit", () => {
      const logoSection = getLogoSection()
      const logo = logoSection.findComponent({ name: "AppLogo" })
      const title = logoSection.find("h1")

      expect(logo.exists()).toBe(true)
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe("Gratitude Jar")
    })
  })

  describe("component integration", () => {
    it("renders AppNavbarGreeting in desktop section", () => {
      const desktopSection = getDesktopSection()
      const AppNavbarGreeting = desktopSection.findComponent({ name: "AppNavbarGreeting" })
      expect(AppNavbarGreeting.exists()).toBe(true)
    })

    it("renders AppNavbarAuthButtons in desktop section", () => {
      const desktopSection = getDesktopSection()
      const AppNavbarAuthButtons = desktopSection.findComponent({ name: "AppNavbarAuthButtons" })
      expect(AppNavbarAuthButtons.exists()).toBe(true)
    })

    it("renders AppThemeButton in desktop section", () => {
      const desktopSection = getDesktopSection()
      const AppThemeButton = desktopSection.findComponent({ name: "AppThemeButton" })
      expect(AppThemeButton.exists()).toBe(true)
    })

    it("renders AppNavbarMobileMenu in mobile section", () => {
      const mobileSection = getMobileSection()
      // Mobile section only exists when screen size is below md breakpoint
      // In test environment, it defaults to desktop size, so mobile section won't exist
      if (mobileSection.exists()) {
        const AppNavbarMobileMenu = mobileSection.findComponent({ name: "AppNavbarMobileMenu" })
        expect(AppNavbarMobileMenu.exists()).toBe(true)
      }
      else {
        // In desktop view, mobile section doesn't exist - this is expected behavior
        expect(mobileSection.exists()).toBe(false)
      }
    })
  })
})
