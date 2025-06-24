import type { Meta, StoryObj } from "@storybook/vue3"

import AppLogo from "./AppLogo.vue"

const meta = {
  title: "App/Logo",
  component: AppLogo,
} as Meta<typeof AppLogo>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: () => ({
    components: { AppLogo },
    template: "<AppLogo />",
  }),
}

// Different sizes
export const Sizes: Story = {
  render: () => ({
    components: { AppLogo },
    template: `
      <div class="space-y-6">
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">Small:</span>
            <div class="w-16 h-16">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">Medium:</span>
            <div class="w-24 h-24">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">Large:</span>
            <div class="w-32 h-32">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">Extra Large:</span>
            <div class="w-48 h-48">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// On different backgrounds
export const OnDifferentBackgrounds: Story = {
  render: () => ({
    components: { AppLogo },
    template: `
      <div class="space-y-6">
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">White Background:</span>
            <div class="w-24 h-24">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gray-100 rounded-lg border border-gray-200">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-900">Light Gray Background:</span>
            <div class="w-24 h-24">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-gray-100">Dark Background:</span>
            <div class="w-24 h-24">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-blue-500 rounded-lg">
          <div class="flex items-center justify-between gap-4">
            <span class="font-medium text-blue-50">Colored Background:</span>
            <div class="w-24 h-24">
              <AppLogo class="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
