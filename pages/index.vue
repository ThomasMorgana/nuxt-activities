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
const { currentFilters, selected } = storeToRefs(store)
const { filter } = store
const route = useRoute()
const router = useRouter()
const { query: routeQuery } = route
currentFilters.value = { ...currentFilters.value, query: routeQuery.query as string ?? '' }
if (routeQuery.selected)
  selected.value = await $fetch(`/api/activities/${routeQuery.selected}`)

watch(currentFilters, (newCurrentFilters) => {
  // this removes the selected querystring, TODO : construct query in 2 phases, one for filters one for selected ?
  if (newCurrentFilters) {
    const { query } = newCurrentFilters
    // const selectedId = routeQuery.selected
    let newQuery = {}
    newQuery = query ? { ...newQuery, query } : {}
    // newQuery = selectedId ? { selected:selectedId, query } : {}
    router.push({
      path: '/',
      query: newQuery,
    })
  }
})

onMounted(() => {
  filter()
})
</script>

<style scoped></style>
