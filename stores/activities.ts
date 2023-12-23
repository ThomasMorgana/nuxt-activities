import { defineStore } from 'pinia'
import type { Activity, Filters } from '~/types'

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [] as Activity[],
    selected: null as Activity | null,
    // I though useFetch was supposed to help me get rid of this flag but doesn't seem to work, so flag to avoid double load in ssr
    initialLoad: false,
    currentPage: 0,
  }),
  getters: {
    currentCenter: (state) => {
      const { selected, activities } = state

      if (selected)
        return [selected.coordinates.lat, selected.coordinates.lng]

      const center = activitiesCenter(activities)
      return [center.lat, center.lng]
    },
  },
  actions: {
    // The fetching responsability could be transfered to the page and replaced by a "pushActivities",
    // pros : keeps the store independant from the data,
    // cons : separate logic that is closely interwiened with the store anyway
    // also : the official documentation also does it here anyway : https://pinia.vuejs.org/core-concepts/actions.html
    async load(filters: Filters = {}) {
      const { page = this.currentPage, itemsPerPage = 20, query = '' } = filters
      const { data } = await useFetch(`/api/activities`, { query: { page, itemsPerPage, query } })

      if (data.value) {
        const { activities } = data.value
        this.activities.push(...activities)
        this.initialLoad = true
      }
    },
    select(activity: Activity) {
      if (this.selected && this.selected.id === activity.id)
        return this.resetSelect()
      this.selected = activity
    },
    resetFilters() {
      this.activities = []
      this.currentPage = 0
      this.load()
    },
    resetSelect() {
      this.selected = null
    },
  },
})
