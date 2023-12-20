<template>
  <div class="bg-green-500 overflow-y-auto hover:overflow-scroll">
    <div>SELECTED : {{ selectedActivity }}</div>
    <div v-for="activity in activities" :key="activity.id" @click="store.selectActivity(activity)">
      {{ activity.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
await store.loadAllActivities()
const activities = computed(() => store.activities)
const selectedActivity = computed(() => store.selectedActivity)
</script>

<style scoped></style>
