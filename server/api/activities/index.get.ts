import { activityDB } from '../../utils/activities.db'
import type { Activity, Filters } from '~/types'

export default defineEventHandler((event) => {
  const allActivities = activityDB.activities
  const queryParams: Filters = getQuery(event)

  // page and itemsPerPage are read from a string instead of being numbers (hence the + sign)
  // could make a cleaner for the filters, for the getQuery or make filter factory maybe
  // For now the easy fix is to use '+' signs or Number() to cast them to number
  // Should probably check if convertion was successful before using them and throw error to be caught by store, but it's christmas yada yada
  const { query, page, itemsPerPage } = queryParams

  // If there's a query string, we filter
  let activities: Activity[] = query
    ? filterActivitiesByName(allActivities, query)
    : [...allActivities]

  // Slice after filtering so the page number is "real"
  if (page && itemsPerPage) {
    const startIndex = Number(page) * Number(itemsPerPage)
    const endIndex = Number(itemsPerPage) + startIndex
    activities = activities.slice(startIndex, endIndex)
  }

  // Could probably return a "total" value here to make front loading stop trying once it reaches the limit.
  // But as it's static data, performance is already really good so unnecessary loads aren't a problem. Would need to if it was a real API call.
  return activities
})

function filterActivitiesByName(activities: Activity[], query: string): Activity[] {
  return activities.filter(activity => activity.name.includes(query))
}
