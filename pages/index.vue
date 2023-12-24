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
const { currentFilters } = storeToRefs(store)
const { filter } = store
const route = useRoute()
const router = useRouter()
const { query: routeQuery } = route
currentFilters.value = { ...currentFilters.value, query: routeQuery.query as string ?? '' }

watch(currentFilters, (newCurrentFilters) => {
  if (newCurrentFilters) {
    const { query = '' } = newCurrentFilters

    const newQuery = query ? { ...routeQuery, query } : {}

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
