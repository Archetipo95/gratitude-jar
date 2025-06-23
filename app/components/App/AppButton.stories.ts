import type { Meta, StoryObj } from "@storybook/vue3"

import AppButton from "./AppButton.vue"

const meta = {
  title: "App/Button",
  component: AppButton,
} as Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { AppButton },
    setup() {
      return { args }
    },
    template: "<AppButton v-bind='args' />",
  }),
  args: {
    label: "Button",
    icon: "mdi:home",
    iconPosition: "left",
    loading: false,
    disabled: false,
    variant: "primary",
    size: "md",
  },
}
