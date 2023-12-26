<template>
  <ActivitySearch class="p-5" />
  <div class="grid grid-cols-3 gap-4 h-4/5 p-5">
    <ActivityList class="min-h-full" />
    <ClientOnly>
      <ActivityMap class="col-span-2" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const store = useActivitiesStore()
const route = useRoute()

const { currentFilters, selected } = storeToRefs(store)
const { filter } = store

const { query: routeQuery } = route
const selectedId = routeQuery.selected

currentFilters.value = { ...currentFilters.value, query: routeQuery.query as string ?? '' }
selected.value = selectedId ? await $fetch(`/api/activities/${selectedId}`) : null

// This in charge of initial load
await filter()
</script>
