import { defineStore } from 'pinia'
import type { Activity } from '~/types'

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [] as Activity[],
    mapCenter: { lat: 0, lng: 0 },
    selected: null as Activity | null,
  }),
  getters: {
    centerCoordinates: state => [state.mapCenter.lat, state.mapCenter.lng],
  },
  actions: {
    async loadAll() {
      const { activities, mapCenter } = await $fetch('/api/activities')
      this.activities = activities
      // when we get to reload on scroll this will need to be calculated
      this.mapCenter = mapCenter
    },
    select(activity: Activity) {
      this.selected = activity
      this.mapCenter = this.selected.coordinates
    },
  },
})
