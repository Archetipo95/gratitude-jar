<script setup lang="ts">
type AppButtonProps = {
  // Button content
  label?: string
  icon?: string
  iconPosition?: "left" | "right"

  // Button states
  loading?: boolean
  disabled?: boolean

  // Button variants
  variant?: "primary" | "secondary" | "outline" | "ghost" | "error"
  size?: "sm" | "md" | "lg" | "xl"

  // Custom styling
  class?: string
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: "secondary",
  size: "md",
  iconPosition: "left",
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Map our variants to UButton colors
const uButtonColorMap = {
  primary: "primary",
  secondary: "neutral",
  outline: "neutral",
  ghost: "neutral",
  error: "error",
} as const

// Map our variants to UButton variants
const uButtonVariantMap = {
  primary: "solid",
  secondary: "solid",
  outline: "outline",
  ghost: "ghost",
  error: "solid",
} as const

// Base design system classes (always applied)
const baseClasses = [
  // Shape & borders
  "rounded-none border-2 border-current",

  // Shadows (neomorphic style)
  "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  "dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]",

  // Transitions
  "transition-transform duration-150 ease-out",
]

// Interactive classes (only when NOT disabled)
const interactiveClasses = computed(() => props.disabled || props.loading
  ? []
  : [
      // Hover states
      "hover:-translate-y-0.5",

      // Active states (pressed effect)
      "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    ])

// Ghost variant handling
const ghostClasses = computed(() => props.variant === "ghost"
  ? [
      "border-transparent shadow-none",
      // Smooth transition for border and shadow appearance
      "transition-all duration-150 ease-in-out",
      ...(props.disabled || props.loading
        ? []
        : [
            "hover:border-current",
            "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            "dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]",
          ]),
    ]
  : [])

// Text color overrides for accessibility
const textColorClasses = computed(() => {
  if (props.variant === "primary") {
    return ["text-[#232323]"]
  }
  else if (props.variant === "error") {
    return ["bg-[#FC7178] text-[#240608]", "dark:text-[#040404]"]
  }
  return []
})

const buttonClasses = computed(() => [
  ...baseClasses,
  ...interactiveClasses.value,
  ...ghostClasses.value,
  ...textColorClasses.value,
  props.class,
].join(" "))

// UButton UI overrides for typography and focus ring
const uiOverrides = {
  base: "font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
}

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit("click", event)
  }
}

const iconSizeMap = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
} as const
</script>

<template>
  <UButton
    class="disabled:!cursor-not-allowed [&[data-loading='true']]:!cursor-wait cursor"
    :color="uButtonColorMap[variant]"
    :variant="uButtonVariantMap[variant]"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :class="buttonClasses"
    :ui="uiOverrides"
    :data-loading="loading"
    @click="handleClick"
  >
    <!-- Left icon -->
    <UIcon
      v-if="icon && iconPosition === 'left'"
      :name="icon"
      class="shrink-0"
      :class="iconSizeMap[size]"
    />

    <!-- Button text -->
    <span v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right icon -->
    <UIcon
      v-if="icon && iconPosition === 'right'"
      :name="icon"
      class="shrink-0"
      :class="iconSizeMap[size]"
    />
  </UButton>
</template>
