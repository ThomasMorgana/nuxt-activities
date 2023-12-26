import { activityDB } from '../../utils/activities.db'
import type { Activity, Filters } from '~/types'

export default defineEventHandler((event) => {
  const allActivities = activityDB.activities
  const queryParams: Filters = getQuery(event)

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
