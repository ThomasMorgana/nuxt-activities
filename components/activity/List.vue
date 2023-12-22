<template>
  <div class="bg-white px-5 rounded-md border border-solid border-slate-300 overflow-y-auto hover:overflow-scroll">
    <div class="sticky top-0 h-12 bg-white border-b mb-2 flex items-center">
      <h2 class="font-bold text-xl">
        Activités
      </h2>
      <span class="font-thin text-lg ml-auto">{{ activities.length }}</span>
    </div>
    <ul role="list" class="divide-y divide-gray-100 scrollable">
      <li v-for="activity in activities" :key="activity.id"
        :class="{ 'bg-green-300': selected && selected.id === activity.id }"
        class="flex justify-between gap-x-6 p-4 rounded-md" @click="select(activity)">
        <ActivityCard :activity="activity" />
      </li>
      <div ref="endOfList" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
const endOfList = ref(null)
const { activities, selected, currentPage } = toRefs(store)
const { load, select } = store

function handleIntersection(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      load({ page: ++currentPage.value })
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection)

  if (endOfList.value)
    observer.observe(endOfList.value)
})
</script>

<style scoped></style>
