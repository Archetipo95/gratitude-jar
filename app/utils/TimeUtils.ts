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
