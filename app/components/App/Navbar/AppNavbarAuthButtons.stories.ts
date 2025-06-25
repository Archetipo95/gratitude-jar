import type { Meta, StoryObj } from "@storybook/vue3"

import AppNavbarAuthButtons from "./AppNavbarAuthButtons.vue"

const meta = {
  title: "App/Navbar/AuthButtons",
  component: AppNavbarAuthButtons,
} as Meta<typeof AppNavbarAuthButtons>

export default meta
type Story = StoryObj<typeof meta>

// Default story - shows auth buttons for logged out user
export const Default: Story = {
  render: () => ({
    components: { AppNavbarAuthButtons },
    setup() {
      // Mock logged out state
      const user = ref(null)
      const client = {
        auth: {
          signInWithOAuth: (options: any) => {
            console.log("Mock OAuth login with:", options.provider)
          },
          signOut: () => {
            console.log("Mock sign out")
          },
        },
      }

      return {
        user,
        client,
      }
    },
    template: `
      <div class="relative">
        <div class="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Auth buttons for logged out user:
          </p>
          <AppNavbarAuthButtons />
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

// Logged in user state
export const LoggedIn: Story = {
  render: () => ({
    components: { AppNavbarAuthButtons },
    setup() {
      // Mock logged in state
      const user = ref({
        id: "123",
        email: "user@example.com",
        user_metadata: {
          user_name: "John Doe",
        },
      })
      const client = {
        auth: {
          signInWithOAuth: (options: any) => {
            console.log("Mock OAuth login with:", options.provider)
          },
          signOut: () => {
            console.log("Mock sign out")
          },
        },
      }

      return {
        user,
        client,
      }
    },
    template: `
      <div class="relative">
        <div class="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Auth buttons for logged in user:
          </p>
          <AppNavbarAuthButtons />
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
