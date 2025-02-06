import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
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

  const mountComponentWithMockedTime = async (mockDate: Date) => {
    vi.setSystemTime(mockDate)
    return await mountSuspended(CountdownTimer)
  }

  const getCountdownText = (wrapper: VueWrapper) => {
    return wrapper.find('[data-test-id="countdown"]').text()
  }

  it('displays the correct initial countdown at the end of the year', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:55'))
    const countdownText = getCountdownText(wrapper)

    expect(countdownText).toContain('0 days')
    expect(countdownText).toContain('0 hours')
    expect(countdownText).toContain('0 minutes')
    expect(countdownText).toContain('5 seconds')
  })

  it('updates the countdown every second', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:55'))
    const countdownText = getCountdownText(wrapper)

    expect(countdownText).toContain('0 days')
    expect(countdownText).toContain('0 hours')
    expect(countdownText).toContain('0 minutes')
    expect(countdownText).toContain('5 seconds')

    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    const updatedCountdownText = getCountdownText(wrapper)
    expect(updatedCountdownText).toContain('0 days')
    expect(updatedCountdownText).toContain('0 hours')
    expect(updatedCountdownText).toContain('0 minutes')
    expect(updatedCountdownText).toContain('0 seconds')
  })

  it('correctly calculates the countdown in the middle of the year', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-30T12:40:50'))
    const countdownText = getCountdownText(wrapper)

    expect(countdownText).toContain('1 days')
    expect(countdownText).toContain('11 hours')
    expect(countdownText).toContain('19 minutes')
    expect(countdownText).toContain('10 seconds')
  })

  it('handles the transition to a new year correctly', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:59'))
    const countdownText = getCountdownText(wrapper)

    expect(countdownText).toContain('0 days')
    expect(countdownText).toContain('0 hours')
    expect(countdownText).toContain('0 minutes')
    expect(countdownText).toContain('1 second')

    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    const updatedCountdownText = getCountdownText(wrapper)
    expect(updatedCountdownText).toContain('0 days')
    expect(updatedCountdownText).toContain('0 hours')
    expect(updatedCountdownText).toContain('0 minutes')
    expect(updatedCountdownText).toContain('0 seconds')
  })
})
