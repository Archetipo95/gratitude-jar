// Function to calculate weeks with start and end dates
export function calculateWeeks(year: number) {
  const weeks = []
  let date = new Date(year, 0, 1) // Start from January 1st of the selected year

  // Calculate weeks
  let weekNumber = 1
  while (date.getFullYear() === year) {
    const start = new Date(date) // Start of the week

    // Move to the next Sunday (end of the week)
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7))
    if (date.getFullYear() !== year) {
      date = new Date(year, 11, 31) // Ensure the last week ends on December 31st
    }
    const end = new Date(date)

    weeks.push({ number: weekNumber, start, end })

    // Move to the next Monday
    date.setDate(date.getDate() + 1)
    weekNumber++
  }

  return weeks
}

// Function to format dates
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function getCurrentWeekNumber() {
  const today = new Date()
  const weeks = calculateWeeks(today.getFullYear())

  for (const week of weeks) {
    const weekStart = new Date(week.start)
    const weekEnd = new Date(week.end)

    // Add 24 hours to include the entire end day
    weekEnd.setHours(weekEnd.getHours() + 24)

    if (today >= weekStart && today <= weekEnd) {
      return week.number
    }
  }

  // If today's date is not found within the weeks, return 0 or handle as needed
  return 0
}
