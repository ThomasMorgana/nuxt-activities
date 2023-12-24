import { defineStore } from 'pinia'
import type { Activity, Filters } from '~/types'

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [] as Activity[],
    selected: null as Activity | null,
    // I though useFetch was supposed to help me get rid of this flag but doesn't seem to work, so flag to avoid double load in ssr
    initialLoad: false,
    // These params could be API defaults params, and thus we could initialise this to null, but setting them here gives us more flexibility
    currentFilters: { page: 0, itemsPerPage: 20, query: '' } as Filters,
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
    async initialize() {
      const { data } = await useFetch(`/api/activities`, { query: this.currentFilters })

      if (data.value) {
        this.activities = data.value
        this.initialLoad = true
      }
    },
    // The fetching responsability could be transfered to the page and replaced by a "pushActivities",
    // pros : keeps the store independant from the data,
    // cons : separate logic that is closely interwiened with the store anyway
    // also : the official documentation also does it here anyway : https://pinia.vuejs.org/core-concepts/actions.html
    async load(filters: Filters = {}) {
      const { page = 0, itemsPerPage = 20, query = '' } = { ...this.currentFilters, ...filters }
      const { data } = await useFetch(`/api/activities`, { query: { page, itemsPerPage, query } })

      if (data.value)
        this.activities.push(...data.value)

      // If an activity is selected, but doesn't appear in new fetch, we keep it
      if (this.selected && !this.activities.includes(this.selected))
        this.activities.unshift(this.selected)
    },
    async filter() {
      this.currentFilters = { ...this.currentFilters, page: 0, itemsPerPage: 20 }

      this.activities = []
      const activities = await $fetch(`/api/activities`, { query: this.currentFilters })

      if (activities)
        this.activities = activities
      // If an activity is selected, but doesn't appear in new fetch, we keep it
      if (this.selected && !this.activities.includes(this.selected))
        this.activities.unshift(this.selected)
    },
    select(activity: Activity) {
      // Toggle behavior
      if (this.selected && this.selected.id === activity.id)
        return this.resetSelect()
      this.selected = activity
    },
    resetActivities() {
      this.activities = []
      this.currentFilters = { page: 0, itemsPerPage: 20, query: '' }
      this.load()
    },
    resetSelect() {
      this.selected = null
    },
  },
})
