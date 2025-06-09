import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import GratitudeLogo from "./GratitudeLogo.vue"

describe("gratitudeLogo", () => {
  it("renders correctly", () => {
    const wrapper = mount(GratitudeLogo)

    // Check that the component renders an SVG element
    expect(wrapper.find("svg").exists()).toBe(true)
  })
})
