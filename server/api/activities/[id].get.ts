import { activityDB } from '../../utils/activities.db'

// All of this should be a call to some backend or database, this is mocked data generation
export default defineEventHandler((event) => {
  return activityDB.activities.find(activity => activity.id === getRouterParam(event, 'id'))
})
