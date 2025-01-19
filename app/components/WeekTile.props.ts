import type { Week } from '~~/types/time.types'

export type WeekTileProps = {
  week: Week
  selectedYear: number
  currentYear: number
  isSubmitting?: boolean
}
