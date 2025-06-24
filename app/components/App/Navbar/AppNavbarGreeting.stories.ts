import type { Meta, StoryObj } from "@storybook/vue3"

import AppNavbarGreeting from "./AppNavbarGreeting.vue"

const meta = {
  title: "App/Navbar/Greeting",
  component: AppNavbarGreeting,
} as Meta<typeof AppNavbarGreeting>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => ({
    components: { AppNavbarGreeting },
    setup() {
      // Mock useSupabaseUser to return null (guest user)
      const mockUser = ref(null)
      return { mockUser }
    },
    template: "<AppNavbarGreeting />",
  }),
}
