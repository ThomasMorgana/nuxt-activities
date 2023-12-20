import { defineStore } from 'pinia'
import type { Activity, Filters } from '~/types'

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
    async loadAll(filters?: Filters) {
      const page = filters.page ?? 0
      const itemsPerPage = filters.itemsPerPage ?? 20
      const queryString = filters.query ?? ''
      const { activities, mapCenter } = await $fetch(`/api/activities?page=${page}&itemsPerPage=${itemsPerPage}&query=${queryString}`)

      // this.activities = this.activities.slice(page * itemsPerPage, page + 1 * itemsPerPage)
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
