import type { Meta, StoryObj } from "@storybook/vue3"

import DisclaimerMessage from "./DisclaimerMessage.vue"

const meta = {
  title: "Components/DisclaimerMessage",
  component: DisclaimerMessage,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof DisclaimerMessage>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { DisclaimerMessage },
    template: "<DisclaimerMessage />",
  }),
}
