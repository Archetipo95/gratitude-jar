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

  const getCountdownValues = (wrapper: VueWrapper) => {
    return {
      days: wrapper.find('[data-test-id="countdown-days"]').text(),
      hours: wrapper.find('[data-test-id="countdown-hours"]').text(),
      minutes: wrapper.find('[data-test-id="countdown-minutes"]').text(),
      seconds: wrapper.find('[data-test-id="countdown-seconds"]').text(),
    }
  }

  it('displays the correct initial countdown at the end of the year', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:55'))
    const countdownValues = getCountdownValues(wrapper)

    expect(countdownValues.days).toBe('0')
    expect(countdownValues.hours).toBe('0')
    expect(countdownValues.minutes).toBe('0')
    expect(countdownValues.seconds).toBe('5')
  })

  it('updates the countdown every second', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:55'))
    const countdownValues = getCountdownValues(wrapper)

    expect(countdownValues.days).toBe('0')
    expect(countdownValues.hours).toBe('0')
    expect(countdownValues.minutes).toBe('0')
    expect(countdownValues.seconds).toBe('5')

    vi.advanceTimersByTime(5000)
    await wrapper.vm.$nextTick()

    const updatedCountdownValues = getCountdownValues(wrapper)
    expect(updatedCountdownValues.days).toBe('0')
    expect(updatedCountdownValues.hours).toBe('0')
    expect(updatedCountdownValues.minutes).toBe('0')
    expect(updatedCountdownValues.seconds).toBe('0')
  })

  it('correctly calculates the countdown in the middle of the year', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-30T12:40:50'))
    const countdownValues = getCountdownValues(wrapper)

    expect(countdownValues.days).toBe('1')
    expect(countdownValues.hours).toBe('11')
    expect(countdownValues.minutes).toBe('19')
    expect(countdownValues.seconds).toBe('10')
  })

  it('handles the transition to a new year correctly', async () => {
    const wrapper = await mountComponentWithMockedTime(new Date('2025-12-31T23:59:59'))
    const countdownValues = getCountdownValues(wrapper)

    expect(countdownValues.days).toBe('0')
    expect(countdownValues.hours).toBe('0')
    expect(countdownValues.minutes).toBe('0')
    expect(countdownValues.seconds).toBe('1')

    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()

    const updatedCountdownValues = getCountdownValues(wrapper)
    expect(updatedCountdownValues.days).toBe('0')
    expect(updatedCountdownValues.hours).toBe('0')
    expect(updatedCountdownValues.minutes).toBe('0')
    expect(updatedCountdownValues.seconds).toBe('0')
  })
})
