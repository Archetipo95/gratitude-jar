import type { Meta, StoryObj } from "@storybook/vue3"
import type { Week } from "~~/types/time.types"

import WeekTile from "./WeekTile.vue"

const meta = {
  title: "Components/WeekTile",
  component: WeekTile,
  argTypes: {
    isSubmitting: {
      control: { type: "boolean" },
    },
    selectedYear: {
      control: { type: "number" },
    },
    currentYear: {
      control: { type: "number" },
    },
  },
} as Meta<typeof WeekTile>

export default meta
type Story = StoryObj<typeof meta>

// Fixed year for consistent screenshots and development
const MOCK_YEAR = 2024

// Helper function to create mock week data
function createMockWeek(weekNumber: number, isCurrentWeek = false): Week {
  const weekStart = new Date(MOCK_YEAR, 0, (weekNumber - 1) * 7 + 1)
  const weekEnd = new Date(MOCK_YEAR, 0, weekNumber * 7)

  return {
    number: weekNumber,
    weekStart,
    weekEnd,
    isCurrentWeek,
  }
}

// Mock messages data
const mockMessages = [
  {
    id: 1,
    message: "I'm grateful for my family's support during challenging times.",
    week: 5,
    year: MOCK_YEAR,
  },
  {
    id: 2,
    message: "Thankful for good health and the ability to exercise daily.",
    week: 10,
    year: MOCK_YEAR,
  },
  {
    id: 3,
    message: "Grateful for the beautiful sunset I witnessed today.",
    week: 15,
    year: MOCK_YEAR,
  },
]

// Default story
export const Default: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(25),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: false,
    messages: [],
  },
}

// Current week (should show as yellow/current)
export const CurrentWeek: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(25, true),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: false,
    messages: [],
  },
}

// Week with message (should show as green/done)
export const WeekWithMessage: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(5),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: false,
    messages: mockMessages,
  },
}

// Past week without message (should show as red/missing)
export const PastWeekMissing: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(20),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: false,
    messages: [],
  },
}

// Future week (should show as gray/future)
export const FutureWeek: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(45),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: false,
    messages: [],
  },
}

// Loading state
export const Loading: Story = {
  render: args => ({
    components: { WeekTile },
    setup() {
      return { args }
    },
    template: "<div class=\"w-80 h-64\"><WeekTile v-bind=\"args\" class=\"w-full h-full\" /></div>",
  }),
  args: {
    week: createMockWeek(25, true),
    selectedYear: MOCK_YEAR,
    currentYear: MOCK_YEAR,
    isSubmitting: true,
    messages: [],
  },
}

// All states showcase
export const AllStates: Story = {
  render: () => ({
    components: { WeekTile },
    setup() {
      const currentYear = MOCK_YEAR
      const states = [
        {
          title: "Current Week",
          week: createMockWeek(25, true),
          messages: [],
          description: "Yellow border - current week without message",
        },
        {
          title: "Week with Message",
          week: createMockWeek(5),
          messages: mockMessages,
          description: "Green border - completed week",
        },
        {
          title: "Past Week Missing",
          week: createMockWeek(20),
          messages: [],
          description: "Red border - past week without message",
        },
        {
          title: "Future Week",
          week: createMockWeek(45),
          messages: [],
          description: "Gray border - future week",
        },
        {
          title: "Loading State",
          week: createMockWeek(25, true),
          messages: [],
          isSubmitting: true,
          description: "Current week with loading button",
        },
      ]

      return {
        states,
        currentYear,
      }
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div v-for="state in states" :key="state.title" class="space-y-2">
          <h3 class="text-lg font-semibold">{{ state.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ state.description }}</p>
          <div class="w-80 h-64">
            <WeekTile 
              :week="state.week" 
              :selected-year="currentYear"
              :current-year="currentYear"
              :is-submitting="state.isSubmitting || false"
              :messages="state.messages"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Mobile view
export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: {
      value: "mobile2",
    },
  },
}
