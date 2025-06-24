import type { Meta, StoryObj } from "@storybook/vue3"

import AppFooter from "./AppFooter.vue"

const meta = {
  title: "App/Footer",
  component: AppFooter,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof AppFooter>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { AppFooter },
    template: "<AppFooter />",
  }),
}

// Small Mobile View
export const SmallMobileView: Story = {
  ...Default,
  globals: {
    viewport: {
      value: "mobile1",
    },
  },
}

// Large Mobile View
export const LargeMobileView: Story = {
  ...Default,
  globals: {
    viewport: {
      value: "mobile2",
    },
  },
}

// Tablet View
export const TabletView: Story = {
  ...Default,
  globals: {
    viewport: {
      value: "tablet",
    },
  },
}
