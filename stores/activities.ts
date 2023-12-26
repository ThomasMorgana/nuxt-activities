import { defineStore } from 'pinia'
import type { Activity, Filters } from '~/types'

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [] as Activity[],
    selected: null as Activity | null,
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
    async load(filters: Filters = {}) {
      const { page = 0, itemsPerPage = 20, query = '' } = { ...this.currentFilters, ...filters }

      try {
        const { data } = await useFetch(`/api/activities`, { query: { page, itemsPerPage, query } })

        if (data.value)
          this.activities.push(...data.value)

        // If an activity is selected, but doesn't appear in new fetch, we keep it
        // Had to use some instead of includes cause Javascript is Javascript
        // Also have to use '!' beacause the linter doesn't understands that I check for null just before for some reason
        if (this.selected && !this.activities.some(activity => activity.id === this.selected!.id))
          this.activities.unshift(this.selected)
      }
      catch (error) {
        console.error(error)
      }
    },
    async filter() {
      this.currentFilters = { ...this.currentFilters, page: 0, itemsPerPage: 20 }

      this.activities = []
      try {
        const activities = await $fetch(`/api/activities`, { query: this.currentFilters })

        if (activities)
          this.activities = activities
        // If an activity is selected, but doesn't appear in new fetch, we keep it
        // Had to use some instead of includes cause Javascript is Javascript
        // Also have to use '!' beacause the linter doesn't understands that I check for null just before for some reason
        if (this.selected && !this.activities.some(activity => activity.id === this.selected!.id))
          this.activities.unshift(this.selected)
      }
      catch (error) {
        console.error(error)
      }
    },
    select(activity: Activity) {
      if (this.selected && this.selected.id === activity.id)
        return this.resetSelect()
      this.selected = activity
    },
    async resetActivities() {
      this.activities = []
      this.selected = null
      this.currentFilters = { page: 0, itemsPerPage: 20, query: '' }
      await this.load()
    },
    resetSelect() {
      this.selected = null
    },
  },
})
