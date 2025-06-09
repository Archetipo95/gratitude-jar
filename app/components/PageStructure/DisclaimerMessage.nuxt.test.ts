import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import DisclaimerMessage from "./DisclaimerMessage.vue"

describe("disclaimerMessage", () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(DisclaimerMessage)
  })

  it("renders welcome message", () => {
    expect(wrapper.text()).toContain("Welcome to the Gratitude Jar!")
  })

  it("renders app description", () => {
    expect(wrapper.text()).toContain("This app allows you to reflect on your week and note down things you're grateful for")
  })

  it("renders instructions section", () => {
    expect(wrapper.text()).toContain("Instructions:")
    expect(wrapper.text()).toContain("You need to login first")
  })

  it("renders current week note", () => {
    expect(wrapper.text()).toContain("Only for the current week you can add more messages")
  })

  it("renders disclaimer about data storage", () => {
    expect(wrapper.text()).toContain("Disclaimer: This app is for demonstration purposes only")
    expect(wrapper.text()).toContain("messages are stored in plain text and are NOT encrypted")
  })

  it("has correct styling classes", () => {
    const container = wrapper.find(".p-6")
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain("bg-white")
    expect(container.classes()).toContain("dark:bg-gray-800")
  })

  it("renders instructions with proper formatting", () => {
    const instructionsTitle = wrapper.find("strong")
    expect(instructionsTitle.exists()).toBe(true)
    expect(instructionsTitle.text()).toBe("Instructions:")
  })

  it("renders disclaimer with proper styling", () => {
    const disclaimer = wrapper.find("em")
    expect(disclaimer.exists()).toBe(true)
    expect(disclaimer.classes()).toContain("border-l-4")
    expect(disclaimer.classes()).toContain("pl-4")
  })
})
