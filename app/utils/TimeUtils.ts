import type { Week } from '~~/types/time.types'

// Function to calculate weeks with start and end dates
export function calculateWeeks(year: number): Week[] {
  const today = new Date()
  const weeks = []

  // Start from January 1st of the selected year
  let date = new Date(year, 0, 1)

  // Calculate weeks
  let weekNumber = 1
  while (date.getFullYear() === year) {
    const weekStart = new Date(date)

    // Move to the next Sunday (end of the week)
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7))

    // Ensure the last week ends on December 31st
    if (date.getFullYear() !== year) {
      date = new Date(year, 11, 31)
    }

    const weekEnd = new Date(date)

    // Include the entire end day
    weekEnd.setHours(weekEnd.getHours() + 23)
    weekEnd.setMinutes(weekEnd.getMinutes() + 59)
    weekEnd.setSeconds(weekEnd.getSeconds() + 59)

    const isCurrentWeek = today >= weekStart && today <= weekEnd

    weeks.push({ number: weekNumber, weekStart, weekEnd, isCurrentWeek })

    // Move to the next Monday
    date.setDate(date.getDate() + 1)
    weekNumber++
  }

  return weeks
}

// Function to get current week number
export function getCurrentWeekNumber(weeks: Week[]): number {
  const currentWeek = weeks.find((week) => week.isCurrentWeek)
  return currentWeek ? currentWeek.number : 0
}

// Function to format dates
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Get first 3 letters of the month
export function getMonthName(date: Date) {
  return date.toLocaleString('default', { month: 'short' })
}
