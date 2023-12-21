<template>
  <div class="bg-green-500 overflow-y-auto hover:overflow-scroll">
    <div>SELECTED : {{ selected }}</div>
    <div @click="resetSelect()">
      CLEAR
    </div>
    <div v-for="activity in activities" :key="activity.id" @click="select(activity)">
      {{ activity.name }}
    </div>
    <div @click="load({ page: ++currentPage })">
      LOAD MORE
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()

const { activities, selected, currentPage } = storeToRefs(store)
const { load, select, resetSelect } = store
</script>

<style scoped></style>
