import type { Meta, StoryObj } from "@storybook/vue3"

import AppNavbarGreeting from "./AppNavbarGreeting.vue"

const meta = {
  title: "App/Navbar/Greeting",
  component: AppNavbarGreeting,
} as Meta<typeof AppNavbarGreeting>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to create story configurations
function createGreetingStory(userData: any) {
  return {
    render: () => ({
      components: { AppNavbarGreeting },
      setup() {
        // Create a mock component that replicates the greeting logic
        const user = ref(userData)
        const greetingMessage = computed(() => {
          if (!user.value)
            return "Hello Guest"
          return `Hello ${user.value.user_metadata.user_name}`
        })

        return { greetingMessage }
      },
      template: `
        <h2 class="text-lg text-gray-800 dark:text-gray-200 uppercase wrap-normal">
          {{ greetingMessage }}
        </h2>
      `,
    }),
  }
}

// Default - Guest user
export const Default: Story = createGreetingStory(null)

// Logged in user
export const LoggedInUser: Story = createGreetingStory({
  user_metadata: {
    user_name: "John Doe",
  },
})

// Different user names
export const WithLongUsername: Story = createGreetingStory({
  user_metadata: {
    user_name: "Christopher Alexander Johnson",
  },
})
