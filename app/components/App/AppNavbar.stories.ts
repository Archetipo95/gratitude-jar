import type { Meta, StoryObj } from "@storybook/vue3"

import AppNavbar from "./AppNavbar.vue"

const meta = {
  title: "App/Navbar",
  component: AppNavbar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof AppNavbar>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { AppNavbar },
    template: "<AppNavbar />",
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
