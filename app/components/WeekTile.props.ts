type Week = {
  number: number
  start: Date
  end: Date
}

export type WeekTileProps = {
  week: Week
  selectedYear: number
  currentYear: number
  isSubmitting?: boolean
}
