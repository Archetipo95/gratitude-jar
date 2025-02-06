import type { Week } from '~~/types/time.types'

export interface WeekTileProps {
  week: Week
  selectedYear: number
  currentYear: number
  isSubmitting: boolean
  messages?: Array<{
    id: number
    message: string
    week: number
    year: number
  }> | null
}
