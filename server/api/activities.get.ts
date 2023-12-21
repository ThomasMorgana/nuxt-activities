import ActivityList from '../utils/activities.db'
import type { Activity, Filters } from '~/types'

// Generate fake data
const activitiesDb = new ActivityList()
activitiesDb.generateList(100)
const globalMapCenter = activitiesDb.mapCenter

// All of this should be a call to some backend or database in real life, this is mocked data generation
export default defineEventHandler((event) => {
  const allActivities = activitiesDb.activities
  const mapCenter = globalMapCenter
  const queryParams: Filters = getQuery(event)

  const { query, page, itemsPerPage } = queryParams

  let activities: Activity[] = query
    ? allActivities.filter(activity => activity.name.includes(query))
    : [...allActivities]

  if (page && itemsPerPage) {
    const startIndex = page * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    activities = activities.slice(startIndex, endIndex)
  }

  return { activities, mapCenter }
})
