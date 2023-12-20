import { defineStore } from 'pinia'

interface Location {
  lat: number
  long: number
}

interface Activity {
  id: number
  name: string
  location: Location
}

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [] as Activity[],
    selectedActivity: null as Activity | null,
  }),
  getters: {
  },
  actions: {
    async loadAllActivities() {
      this.activities = await $fetch('/api/activities')
    },
    selectActivity(activity: Activity) {
      this.selectedActivity = activity
    },
  },
})
