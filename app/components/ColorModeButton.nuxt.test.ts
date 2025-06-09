import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import ColorModeButton from "./ColorModeButton.vue"

describe("colorModeButton", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(ColorModeButton)
  })

  describe("component structure", () => {
    it("renders as a ClientOnly button with icon", () => {
      // ClientOnly wrapper
      const clientOnly = wrapper.findComponent({ name: "ClientOnly" })
      expect(clientOnly.exists()).toBe(true)

      // Button element
      const button = wrapper.find("button")
      expect(button.exists()).toBe(true)
      expect(button.element.tagName.toLowerCase()).toBe("button")
      expect(button.attributes("type")).toBe("button")

      // Icon within button
      const icon = wrapper.find(".iconify")
      expect(icon.exists()).toBe(true)
      expect(button.element.contains(icon.element)).toBe(true)
    })

    it("uses lucide sun or moon icons", () => {
      const icon = wrapper.find(".iconify")
      const hasValidIcon = icon.classes().some(cls =>
        cls === "i-lucide:sun" || cls === "i-lucide:moon",
      )
      expect(hasValidIcon).toBe(true)
    })
  })

  describe("accessibility", () => {
    it("provides proper accessibility attributes", () => {
      const button = wrapper.find("button")
      const icon = wrapper.find(".iconify")

      // Button should have descriptive aria-label
      const ariaLabel = button.attributes("aria-label")
      expect(ariaLabel).toBeTruthy()
      expect(ariaLabel).toMatch(/Switch to (light|dark) mode/)

      // Icon should be decorative
      expect(icon.attributes("aria-hidden")).toBe("true")

      // Button should be enabled for interaction
      expect(button.attributes("disabled")).toBeUndefined()
    })
  })

  describe("theme state consistency", () => {
    it("shows appropriate icon and label for current mode", () => {
      const button = wrapper.find("button")
      const icon = wrapper.find(".iconify")
      const ariaLabel = button.attributes("aria-label")

      // Icon and label should be consistent (showing opposite of current mode)
      if (icon.classes().includes("i-lucide:sun")) {
        expect(ariaLabel).toBe("Switch to dark mode")
      }
      else if (icon.classes().includes("i-lucide:moon")) {
        expect(ariaLabel).toBe("Switch to light mode")
      }
      else {
        throw new Error("Icon should be either sun or moon")
      }
    })
  })
})
