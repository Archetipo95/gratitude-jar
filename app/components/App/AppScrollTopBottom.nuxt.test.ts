import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import AppScrollTopBottom from "./AppScrollTopBottom.vue"

describe("appScrollTopBottom", () => {
  let wrapper: VueWrapper
  let mockScrollTo: ReturnType<typeof vi.fn>
  let mockAddEventListener: ReturnType<typeof vi.fn>
  let mockRemoveEventListener: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    // Mock window methods
    mockScrollTo = vi.fn()
    mockAddEventListener = vi.fn()
    mockRemoveEventListener = vi.fn()

    Object.defineProperty(window, "scrollTo", {
      value: mockScrollTo,
      writable: true,
    })

    Object.defineProperty(window, "addEventListener", {
      value: mockAddEventListener,
      writable: true,
    })

    Object.defineProperty(window, "removeEventListener", {
      value: mockRemoveEventListener,
      writable: true,
    })

    // Mock window properties
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    })

    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    })

    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    })

    wrapper = await mountSuspended(AppScrollTopBottom)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // Helper functions using data-test-ids
  const getScrollToTopButton = () => wrapper.find("[data-test-id=\"scroll-to-top-button\"]")
  const getScrollToBottomButton = () => wrapper.find("[data-test-id=\"scroll-to-bottom-button\"]")

  const triggerScrollPosition = async (scrollY: number) => {
    Object.defineProperty(window, "scrollY", {
      value: scrollY,
      writable: true,
    })
    const component = wrapper.vm as any
    component.checkScrollPosition()
    await wrapper.vm.$nextTick()
  }

  describe("scroll buttons", () => {
    beforeEach(async () => {
      // Make navigator visible for button tests
      await triggerScrollPosition(150)
    })

    it("renders both scroll buttons when visible", () => {
      expect(getScrollToTopButton().exists()).toBe(true)
      expect(getScrollToBottomButton().exists()).toBe(true)
    })

    it("scrolls to top when top button is clicked", async () => {
      const topButton = getScrollToTopButton()
      await topButton.trigger("click")

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })

    it("scrolls to bottom when bottom button is clicked", async () => {
      const bottomButton = getScrollToBottomButton()
      await bottomButton.trigger("click")

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 2000, // document.documentElement.scrollHeight
        behavior: "smooth",
      })
    })
  })

  describe("top button state", () => {
    it("is disabled when at top of page", async () => {
      await triggerScrollPosition(0)
      const topButton = getScrollToTopButton()
      expect(topButton.attributes("disabled")).toBeDefined()
    })

    it("is enabled when not at top of page, after 100px", async () => {
      await triggerScrollPosition(100)
      const topButton = getScrollToTopButton()
      expect(topButton.attributes("disabled")).toBeUndefined()
    })
  })

  describe("bottom button state", () => {
    it("is enabled when not at bottom of page", async () => {
      await triggerScrollPosition(150) // Not at bottom

      const bottomButton = getScrollToBottomButton()
      expect(bottomButton.attributes("disabled")).toBeUndefined()
    })

    it("is disabled when at bottom of page", async () => {
      await triggerScrollPosition(1200) // 1200 + 800 = 2000 (scrollHeight)

      const bottomButton = getScrollToBottomButton()
      expect(bottomButton.attributes("disabled")).toBeDefined()
    })
  })

  describe("event listeners", () => {
    it("adds scroll event listener on mount", () => {
      expect(mockAddEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
    })

    it("removes scroll event listener on unmount", () => {
      wrapper.unmount()
      expect(mockRemoveEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
    })
  })
})
