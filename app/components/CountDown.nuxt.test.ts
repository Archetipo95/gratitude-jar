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
    const mockDate = new Date('2023-12-31T23:59:55')
    vi.setSystemTime(mockDate)

    // Mount the component after setting the system time
    const wrapper = await mountSuspended(CountdownTimer)

    // Check initial countdown values
    const countdownText = wrapper.find('[data-test-id="countdown"]').text()
    expect(countdownText).toContain('0 days')
    expect(countdownText).toContain('0 hours')
    expect(countdownText).toContain('0 minutes')
    expect(countdownText).toContain('5 seconds')
  })

  it('updates the countdown every second', async () => {
    // Mock the current date to a known value
    const mockDate = new Date('2023-12-31T23:59:55')
    vi.setSystemTime(mockDate)

    // Mount the component after setting the system time
    const wrapper = await mountSuspended(CountdownTimer)

    // Check initial countdown values
    const countdownText = wrapper.find('[data-test-id="countdown"]').text()
    expect(countdownText).toContain('0 days')
    expect(countdownText).toContain('0 hours')
    expect(countdownText).toContain('0 minutes')
    expect(countdownText).toContain('5 seconds')

    // Advance time by 5 seconds
    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    // Check updated countdown values
    const updatedCountdownText = wrapper.find('[data-test-id="countdown"]').text()
    expect(updatedCountdownText).toContain('0 days')
    expect(updatedCountdownText).toContain('0 hours')
    expect(updatedCountdownText).toContain('0 minutes')
    expect(updatedCountdownText).toContain('0 seconds')
  })
})
