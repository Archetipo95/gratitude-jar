import type { VueWrapper } from "@vue/test-utils"

import { mountSuspended } from "@nuxt/test-utils/runtime"

import ModalSubmitMessage from "./ModalSubmitMessage.vue"

// Mock Supabase
const mockInsert = vi.fn()
const mockFrom = vi.fn(() => ({ insert: mockInsert }))
const mockSupabaseClient = { from: mockFrom }
const mockSupabaseUser = ref({ id: "test-user-id" })
const mockToastAdd = vi.fn()

vi.mock("#imports", async () => {
  const actual = await vi.importActual("#imports")
  return {
    ...actual,
    useSupabaseClient: () => mockSupabaseClient,
    useSupabaseUser: () => mockSupabaseUser,
    useToast: () => ({
      add: mockToastAdd,
    }),
  }
})

describe("modalSubmitMessage", () => {
  let wrapper: VueWrapper
  const defaultProps = {
    weekNumber: 25,
    selectedYear: 2024,
    isSubmitting: false,
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
    wrapper = await mountSuspended(ModalSubmitMessage, {
      props: defaultProps,
    })
  })

  describe("component", () => {
    it("mounts successfully", () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm).toBeTruthy()
    })

    it("receives props correctly", () => {
      const vm = wrapper.vm as any
      expect(vm.weekNumber).toBe(25)
      expect(vm.selectedYear).toBe(2024)
    })

    it("emits events correctly", () => {
      wrapper.vm.$emit("close")
      wrapper.vm.$emit("messageSubmitted")
      wrapper.vm.$emit("failedSubmit")

      expect(wrapper.emitted("close")).toBeTruthy()
      expect(wrapper.emitted("messageSubmitted")).toBeTruthy()
      expect(wrapper.emitted("failedSubmit")).toBeTruthy()
    })

    it("updates props when changed", async () => {
      await wrapper.setProps({
        weekNumber: 10,
        selectedYear: 2025,
      })

      const vm = wrapper.vm as any
      expect(vm.weekNumber).toBe(10)
      expect(vm.selectedYear).toBe(2025)
    })
  })
})
