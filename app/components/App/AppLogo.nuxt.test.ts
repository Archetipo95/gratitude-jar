import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import AppLogo from "./AppLogo.vue"

describe("appLogo", () => {
  it("renders correctly", () => {
    const wrapper = mount(AppLogo)

    // Check that the component renders an SVG element
    expect(wrapper.find("svg").exists()).toBe(true)
  })
})
