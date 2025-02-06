import { calculateWeeks, formatDate, getMonthName } from './TimeUtils'

describe('TimeUtils', () => {
  beforeEach(() => {
    // Set fixed date for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-03-14T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('calculateWeeks', () => {
    it('calculates correct number of weeks for a year', () => {
      // Test a regular year (2023)
      const weeks2023 = calculateWeeks(2023)
      expect(weeks2023.length).toBe(53)

      // Test a leap year (2024)
      const weeks2024 = calculateWeeks(2024)
      expect(weeks2024.length).toBe(53)
    })

    it('sets correct start and end dates for weeks', () => {
      const weeks = calculateWeeks(2024)
      const firstWeek = weeks[0]
      const lastWeek = weeks[weeks.length - 1]

      // Check date components separately to avoid timezone issues
      expect(firstWeek?.weekStart.getFullYear()).toBe(2024)
      expect(firstWeek?.weekStart.getMonth()).toBe(0) // January
      expect(firstWeek?.weekStart.getDate()).toBe(1) // 1st

      expect(lastWeek?.weekEnd.getFullYear()).toBe(2024)
      expect(lastWeek?.weekEnd.getMonth()).toBe(11) // December
      expect(lastWeek?.weekEnd.getDate()).toBe(31) // 31st
    })

    it('marks current week correctly', () => {
      const weeks = calculateWeeks(2024)
      const currentWeek = weeks.find((week) => week.isCurrentWeek)

      expect(currentWeek).toBeDefined()
      expect(currentWeek?.number).toBe(11) // March 14, 2024 is in week 11
    })
  })

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-03-14')
      const formatted = formatDate(date)

      expect(formatted).toBe('14/03/2024')
    })

    it('pads single digits with zeros', () => {
      const date = new Date('2024-01-05')
      const formatted = formatDate(date)

      expect(formatted).toBe('05/01/2024')
    })
  })

  describe('getMonthName', () => {
    it('returns correct month abbreviation', () => {
      const date = new Date('2024-03-14')
      const monthName = getMonthName(date)

      expect(monthName).toBe('Mar')
    })

    it('handles different months correctly', () => {
      const january = new Date('2024-01-01')
      const december = new Date('2024-12-31')

      expect(getMonthName(january)).toBe('Jan')
      expect(getMonthName(december)).toBe('Dec')
    })
  })
})
