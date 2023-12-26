import { activityDB } from '../../utils/activities.db'

export default defineEventHandler((event) => {
  return activityDB.activities.find(activity => activity.id === getRouterParam(event, 'id'))
})
