import type { Meta, StoryObj } from "@storybook/vue3"

import WeekGrid from "./WeekGrid.vue"

const meta = {
  title: "Components/WeekGrid",
  component: WeekGrid,
} as Meta<typeof WeekGrid>

export default meta
type Story = StoryObj<typeof meta>

// Default story - Shows the complete WeekGrid with all functionality
export const Default: Story = {
  render: () => ({
    components: { WeekGrid },
    template: "<WeekGrid />",
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
