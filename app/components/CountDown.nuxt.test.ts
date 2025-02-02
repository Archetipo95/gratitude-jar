import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import CountdownTimer from './CountDown.vue'

describe('CountdownTimer', () => {
  beforeEach(() => {
    // Use fake timers for each test
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Restore real timers after each test
    vi.useRealTimers()
  })

  it('displays the correct initial countdown', async () => {
    // Mock the current date to a known value
    const mockDate = new Date('2023-12-30T00:00:00')
    vi.setSystemTime(mockDate)

    const wrapper = await mountSuspended(CountdownTimer)

    // Check initial countdown values
    expect(wrapper.text()).toContain('1 days')
    expect(wrapper.text()).toContain('0 hours')
    expect(wrapper.text()).toContain('0 minutes')
    expect(wrapper.text()).toContain('0 seconds')
  })

  it('updates the countdown every second', async () => {
    // Mock the current date to a known value
    const mockDate = new Date('2023-12-31T23:59:55')
    vi.setSystemTime(mockDate)

    const wrapper = await mountSuspended(CountdownTimer)

    // Check initial countdown values
    expect(wrapper.text()).toContain('0 days')
    expect(wrapper.text()).toContain('0 hours')
    expect(wrapper.text()).toContain('0 minutes')
    expect(wrapper.text()).toContain('5 seconds')

    // Advance time by 5 seconds
    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    // Check updated countdown values
    expect(wrapper.text()).toContain('0 days')
    expect(wrapper.text()).toContain('0 hours')
    expect(wrapper.text()).toContain('0 minutes')
    expect(wrapper.text()).toContain('0 seconds')
  })
})
