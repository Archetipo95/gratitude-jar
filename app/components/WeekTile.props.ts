import type { Week } from "~~/types/time.types"

export type WeekTileProps = {
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
