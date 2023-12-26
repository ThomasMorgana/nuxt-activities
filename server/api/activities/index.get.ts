import { activityDB } from '../../utils/activities.db'
import type { Activity, Filters } from '~/types'

// All of this should be a call to some backend or database, this is mocked data generation
export default defineEventHandler((event) => {
  const allActivities = activityDB.activities
  const queryParams: Filters = getQuery(event)

  // page and itemsPerPage are read from a string instead of being numbers (hence the + sign)
  // could make a cleaner for the filters, for the getQuery or make filter factory maybe
  // For now the easy fix is to use '+' signs or Number() to cast them to number
  // Should probably check if convertion was successful before using them
  const { query, page, itemsPerPage } = queryParams

  let activities: Activity[] = query
    ? filterActivitiesByName(allActivities, query)
    : [...allActivities]

  if (page && itemsPerPage) {
    const startIndex = Number(page) * Number(itemsPerPage)
    const endIndex = Number(itemsPerPage) + startIndex
    activities = activities.slice(startIndex, endIndex)
  }

  return activities
})

function filterActivitiesByName(activities: Activity[], query: string): Activity[] {
  return activities.filter(activity => activity.name.includes(query))
}
