<template>
  <div class="bg-blue-500">
    Component: Search

    <button
      @click="store.applyFilters({ query: '', itemsPerPage: 10, page: 3 })"
    >
      FILTER
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
</script>

<style scoped></style>
