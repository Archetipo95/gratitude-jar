import type { Meta, StoryObj } from "@storybook/vue3"

import AppThemeButton from "./AppThemeButton.vue"

const meta = {
  title: "App/ThemeButton",
  component: AppThemeButton,
} as Meta<typeof AppThemeButton>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { AppThemeButton },
    template: "<AppThemeButton />",
  }),
}
