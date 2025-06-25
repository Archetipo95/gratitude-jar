import type { Meta, StoryObj } from "@storybook/vue3"

import AppNavbarMobileMenu from "./AppNavbarMobileMenu.vue"

const meta = {
  title: "App/Navbar/MobileMenu",
  component: AppNavbarMobileMenu,
} as Meta<typeof AppNavbarMobileMenu>

export default meta
type Story = StoryObj<typeof meta>

// Default story - shows the mobile menu in its natural state
export const Default: Story = {
  render: () => ({
    components: { AppNavbarMobileMenu },
    template: `
      <div class="relative">
        <div class="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Click the hamburger button to toggle the mobile menu:
          </p>
          <AppNavbarMobileMenu />
        </div>
      </div>
    `,
  }),
  globals: {
    viewport: {
      value: "mobile2",
    },
  },
}
