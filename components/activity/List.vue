<template>
  <div class="bg-white px-5 rounded-md border border-solid border-slate-300">
    <div class="h-1/6 bg-white border-b flex items-center">
      <h2 class="font-bold text-xl">
        Activités
      </h2>
      <span class="font-thin text-lg ml-auto">{{ activities.length }}</span>
    </div>
    <div id="container" class="overflow-y-scroll h-5/6">
      <ul role="list" class="divide-y divide-gray-100 overflow-hidden">
        <li
          v-for="activity in activities" :id="activity.id" :key="activity.id"
          :class="{ 'bg-green-300': selected && selected.id === activity.id }"
          class="flex justify-between gap-x-6 p-4 rounded-md scroll-mt-12" @click="select(activity)"
        >
          <ActivityCard :activity="activity" />
        </li>
        <div ref="endOfList" />
      </ul>
    </div>
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

watch(selected, (newSelected) => {
  if (newSelected && newSelected.id) {
    const activity = document.getElementById(newSelected.id)
    const container = document.getElementById('container')

    if (activity && container) {
      const rect = activity.getBoundingClientRect()
      const rectContainer = container.getBoundingClientRect()

      const isVisible = rect.top >= rectContainer.top && rect.bottom <= rectContainer.bottom

      if (!isVisible)
        activity.scrollIntoView()
    }
  }
})

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection)

  if (endOfList.value)
    observer.observe(endOfList.value)
})
</script>

<style scoped></style>
