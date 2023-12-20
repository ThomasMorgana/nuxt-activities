<template>
  <div class="bg-green-500 overflow-y-auto hover:overflow-scroll">
    <div>SELECTED : {{ selected }}</div>
    <div v-for="activity in activities" :key="activity.id" @click="store.select(activity)">
      {{ activity.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
await store.loadAll()
const activities = computed(() => store.activities)
const selected = computed(() => store.selected)
</script>

<style scoped></style>
