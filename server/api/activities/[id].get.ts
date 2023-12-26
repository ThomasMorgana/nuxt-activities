import { activityDB } from '../../utils/activities.db'

export default defineEventHandler((event) => {
  // Oneliner because why not, they're the cool kids after all
  // Could extract activities, and router param for readability tho, but will lose style points
  return activityDB.activities.find(activity => activity.id === getRouterParam(event, 'id'))
})
