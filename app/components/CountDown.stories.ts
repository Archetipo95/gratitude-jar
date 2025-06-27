import type { Meta, StoryObj } from "@storybook/vue3"

import CountDown from "./CountDown.vue"

const meta = {
  title: "Components/CountDown",
  component: CountDown,
} as Meta<typeof CountDown>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { CountDown },
    template: "<CountDown />",
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
