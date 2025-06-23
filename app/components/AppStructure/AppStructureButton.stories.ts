import type { Meta, StoryObj } from "@storybook/vue3"

import AppStructureButton from "./AppStructureButton.vue"

const meta = {
  title: "AppStructure/Button",
  component: AppStructureButton,
} as Meta<typeof AppStructureButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { AppStructureButton },
    setup() {
      return { args }
    },
    template: "<AppStructureButton v-bind='args' />",
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
