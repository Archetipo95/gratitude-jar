import type { Meta, StoryObj } from "@storybook/vue3"

import AppButton from "./AppButton.vue"

const meta = {
  title: "App/Button",
  component: AppButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    icon: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

// Default story (playground)
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
    icon: "lucide:home",
    iconPosition: "left",
    loading: false,
    disabled: false,
    variant: "primary",
    size: "md",
  },
}

// Variant stories
export const Variants: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton label="Primary" variant="primary" />
          <AppButton label="Secondary" variant="secondary" />
          <AppButton label="Outline" variant="outline" />
          <AppButton label="Ghost" variant="ghost" />
          <AppButton label="Error" variant="error" />
        </div>
      </div>
    `,
  }),
}

// Size stories
export const Sizes: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="flex flex-wrap gap-4 items-end">
        <AppButton label="Small" size="sm" />
        <AppButton label="Medium" size="md" />
        <AppButton label="Large" size="lg" />
        <AppButton label="Extra Large" size="xl" />
      </div>
    `,
  }),
}

// Comprehensive grid showing all variants and sizes
export const VariantsXSizes: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="mb-4 text-lg font-semibold">All Variants × All Sizes</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-6">
              <div class="w-20 font-medium">Primary</div>
              <div class="flex gap-4 items-end">
                <AppButton label="Small" variant="primary" size="sm" />
                <AppButton label="Medium" variant="primary" size="md" />
                <AppButton label="Large" variant="primary" size="lg" />
                <AppButton label="Extra Large" variant="primary" size="xl" />
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <div class="w-20 font-medium">Secondary</div>
              <div class="flex gap-4 items-end">
                <AppButton label="Small" variant="secondary" size="sm" />
                <AppButton label="Medium" variant="secondary" size="md" />
                <AppButton label="Large" variant="secondary" size="lg" />
                <AppButton label="Extra Large" variant="secondary" size="xl" />
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <div class="w-20 font-medium">Outline</div>
              <div class="flex gap-4 items-end">
                <AppButton label="Small" variant="outline" size="sm" />
                <AppButton label="Medium" variant="outline" size="md" />
                <AppButton label="Large" variant="outline" size="lg" />
                <AppButton label="Extra Large" variant="outline" size="xl" />
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <div class="w-20 font-medium">Ghost</div>
              <div class="flex gap-4 items-end">
                <AppButton label="Small" variant="ghost" size="sm" />
                <AppButton label="Medium" variant="ghost" size="md" />
                <AppButton label="Large" variant="ghost" size="lg" />
                <AppButton label="Extra Large" variant="ghost" size="xl" />
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <div class="w-20 font-medium">Error</div>
              <div class="flex gap-4 items-end">
                <AppButton label="Small" variant="error" size="sm" />
                <AppButton label="Medium" variant="error" size="md" />
                <AppButton label="Large" variant="error" size="lg" />
                <AppButton label="Extra Large" variant="error" size="xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// With icons
export const WithIcons: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton label="Primary" icon="lucide:heart" icon-position="left" variant="primary" />
          <AppButton label="Secondary" icon="lucide:star" icon-position="left" variant="secondary" />
          <AppButton label="Outline" icon="lucide:bookmark" icon-position="left" variant="outline" />
          <AppButton label="Ghost" icon="lucide:share" icon-position="left" variant="ghost" />
          <AppButton label="Error" icon="lucide:trash" icon-position="left" variant="error" />
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton label="Primary" icon="lucide:arrow-right" icon-position="right" variant="primary" />
          <AppButton label="Secondary" icon="lucide:arrow-right" icon-position="right" variant="secondary" />
          <AppButton label="Outline" icon="lucide:arrow-right" icon-position="right" variant="outline" />
          <AppButton label="Ghost" icon="lucide:arrow-right" icon-position="right" variant="ghost" />
          <AppButton label="Error" icon="lucide:arrow-right" icon-position="right" variant="error" />
        </div>
      </div>
    `,
  }),
}

// Icon only buttons
export const IconOnly: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="flex flex-wrap gap-4 items-center">
        <AppButton icon="lucide:heart" variant="primary" />
        <AppButton icon="lucide:star" variant="secondary" />
        <AppButton icon="lucide:bookmark" variant="outline" />
        <AppButton icon="lucide:share" variant="ghost" />
        <AppButton icon="lucide:trash" variant="error" />
      </div>
    `,
  }),
}

// Loading states
export const LoadingStates: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton label="Primary" variant="primary" :loading="true" />
          <AppButton label="Secondary" variant="secondary" :loading="true" />
          <AppButton label="Outline" variant="outline" :loading="true" />
          <AppButton label="Ghost" variant="ghost" :loading="true" />
          <AppButton label="Error" variant="error" :loading="true" />
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton icon="lucide:heart" variant="primary" :loading="true" />
          <AppButton icon="lucide:star" variant="secondary" :loading="true" />
          <AppButton icon="lucide:bookmark" variant="outline" :loading="true" />
          <AppButton icon="lucide:share" variant="ghost" :loading="true" />
          <AppButton icon="lucide:trash" variant="error" :loading="true" />
        </div>
      </div>
    `,
  }),
}

// Disabled states
export const DisabledStates: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton label="Primary" variant="primary" :disabled="true" />
          <AppButton label="Secondary" variant="secondary" :disabled="true" />
          <AppButton label="Outline" variant="outline" :disabled="true" />
          <AppButton label="Ghost" variant="ghost" :disabled="true" />
          <AppButton label="Error" variant="error" :disabled="true" />
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <AppButton icon="lucide:heart" variant="primary" :disabled="true" />
          <AppButton icon="lucide:star" variant="secondary" :disabled="true" />
          <AppButton icon="lucide:bookmark" variant="outline" :disabled="true" />
          <AppButton icon="lucide:share" variant="ghost" :disabled="true" />
          <AppButton icon="lucide:trash" variant="error" :disabled="true" />
        </div>
      </div>
    `,
  }),
}

// Common UI patterns
export const CommonPatterns: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-3 text-lg font-semibold">Form Actions</h3>
          <div class="flex gap-3">
            <AppButton label="Cancel" variant="ghost" />
            <AppButton label="Save Draft" variant="outline" />
            <AppButton label="Submit" variant="primary" icon="lucide:check" />
          </div>
        </div>
        
        <div>
          <h3 class="mb-3 text-lg font-semibold">CRUD Operations</h3>
          <div class="flex gap-3">
            <AppButton label="Create" variant="primary" icon="lucide:plus" />
            <AppButton label="Edit" variant="secondary" icon="lucide:edit" />
            <AppButton label="Delete" variant="error" icon="lucide:trash" />
          </div>
        </div>
        
        <div>
          <h3 class="mb-3 text-lg font-semibold">Navigation</h3>
          <div class="flex gap-3">
            <AppButton label="Back" variant="ghost" icon="lucide:arrow-left" />
            <AppButton label="Next" variant="primary" icon="lucide:arrow-right" icon-position="right" />
          </div>
        </div>
        
        <div>
          <h3 class="mb-3 text-lg font-semibold">Social Actions</h3>
          <div class="flex gap-3">
            <AppButton icon="lucide:heart" variant="ghost" />
            <AppButton icon="lucide:share" variant="ghost" />
            <AppButton icon="lucide:bookmark" variant="ghost" />
            <AppButton icon="lucide:message-circle" variant="ghost" />
          </div>
        </div>
        
        <div>
          <h3 class="mb-3 text-lg font-semibled">File Operations</h3>
          <div class="flex gap-3">
            <AppButton label="Upload" variant="primary" icon="lucide:upload" />
            <AppButton label="Download" variant="outline" icon="lucide:download" />
            <AppButton label="Export" variant="secondary" icon="lucide:external-link" />
          </div>
        </div>
      </div>
    `,
  }),
}
