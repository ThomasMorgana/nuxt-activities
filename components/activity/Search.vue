<template>
  <div class="bg-white px-5 border-b border-solid border-slate-300">
    <div class="flex w-1/3 flex-wrap gap-1">
      <input
        v-model="currentFilters.query"
        type="search"
        class="min-w-0 flex-auto rounded border border-gray-300 bg-transparent bg-clip-padding px-3 text-base font-normal text-neutral-700 outline-none transition duration-200 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
        placeholder="Search"
        aria-label="Search"
      >

      <button
        class="rounded border border-gray-300 px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="button"
        @click="applyFilters()"
      >
        Search
      </button>
      <button
        class="rounded border border-gray-300 px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="button"
        @click="clearActivities()"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
const { currentFilters, selected } = storeToRefs(store)

const { filter, resetActivities } = store
const router = useRouter()

async function applyFilters() {
  const { query } = currentFilters.value
  const selectedId = selected.value ? selected.value.id : null

  const newQuery = {
    ...(query ? { query } : {}),
    ...(selectedId ? { selected: selectedId } : {}),
  }

  router.push({
    path: '/',
    query: newQuery,
  })

  await filter()
}

function clearActivities() {
  resetActivities()
  router.push({
    path: '/',
  })
}
</script>
