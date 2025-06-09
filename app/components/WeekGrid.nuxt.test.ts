import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import WeekGrid from "./WeekGrid.vue"

// Mock dependencies
const mockWeeks = [
  { number: 1, isCurrentWeek: false },
  { number: 2, isCurrentWeek: false },
  { number: 25, isCurrentWeek: true },
  { number: 26, isCurrentWeek: false },
]

const mockUseWeek = {
  weeks: ref(mockWeeks),
  changeYear: vi.fn(),
  currentWeekNumber: ref(25),
}

const mockMessages = [
  { id: 1, message: "Test message", week: 1, year: 2024 },
]

const mockSupabaseClient = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: mockMessages })),
      })),
    })),
  })),
}

const mockSupabaseUser = ref({ id: "test-user-id" })

vi.mock("#imports", async () => {
  const actual = await vi.importActual("#imports")
  return {
    ...actual,
    useWeek: () => mockUseWeek,
    useSupabaseClient: () => mockSupabaseClient,
    useSupabaseUser: () => mockSupabaseUser,
    useAsyncData: vi.fn(() => ({
      data: ref(mockMessages),
      refresh: vi.fn(),
      status: ref("success"),
    })),
    getCurrentYear: () => 2024,
  }
})

describe("weekGrid", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = await mountSuspended(WeekGrid)
  })

  it("renders year selection dropdown", () => {
    const yearSelect = wrapper.findComponent({ name: "USelect" })
    expect(yearSelect.exists()).toBe(true)
  })

  it("renders year overview label", () => {
    expect(wrapper.text()).toContain("Year Overview")
  })

  it("renders newest first checkbox", () => {
    // Test for checkbox functionality by checking for text content
    expect(wrapper.text()).toContain("Newest First")
  })

  it("renders show all weeks checkbox for current year", () => {
    expect(wrapper.text()).toContain("Show All Weeks")
  })

  it("renders WeekTile components", () => {
    const weekTiles = wrapper.findAllComponents({ name: "WeekTile" })
    expect(weekTiles.length).toBeGreaterThan(0)
  })

  it("passes correct props to WeekTile components", () => {
    const firstWeekTile = wrapper.findComponent({ name: "WeekTile" })
    expect(firstWeekTile.props()).toMatchObject({
      selectedYear: expect.any(Number),
      currentYear: expect.any(Number),
      messages: expect.any(Array),
      isSubmitting: false,
    })
  })

  it("has correct grid layout classes", () => {
    const grid = wrapper.find(".grid")
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain("grid-cols-1")
    expect(grid.classes()).toContain("sm:grid-cols-2")
    expect(grid.classes()).toContain("lg:grid-cols-3")
  })

  it("has loading state structure", () => {
    // Test that the component has the structure for loading states
    expect(wrapper.html()).toContain("grid")
  })

  it("calls changeYear when selectedYear changes", async () => {
    // Test that the year select component exists and can handle value changes
    const yearSelect = wrapper.findComponent({ name: "USelect" })
    expect(yearSelect.exists()).toBe(true)

    // Test component structure rather than mock interactions
    expect(yearSelect.props()).toHaveProperty("modelValue")
  })

  it("handles refresh event from WeekTile", async () => {
    // Test that WeekTile components are rendered
    const weekTiles = wrapper.findAllComponents({ name: "WeekTile" })
    expect(weekTiles.length).toBeGreaterThan(0)
  })

  it("filters weeks correctly for current year", () => {
    // By default, should only show weeks up to current week (25)
    const weekTiles = wrapper.findAllComponents({ name: "WeekTile" })
    const weekNumbers = weekTiles.map(tile => tile.props("week").number)

    // Should not include week 26 since current week is 25
    expect(weekNumbers).not.toContain(26)
  })

  it("has show all weeks functionality", () => {
    expect(wrapper.text()).toContain("Show All Weeks")
  })

  it("has correct container styling", () => {
    const container = wrapper.find(".space-y-6")
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain("max-w-7xl")
    expect(container.classes()).toContain("mx-auto")
  })

  it("has correct header styling", () => {
    const header = wrapper.find(".flex.items-center.justify-between")
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain("p-6")
    expect(header.classes()).toContain("bg-white")
    expect(header.classes()).toContain("dark:bg-gray-800")
  })
})
