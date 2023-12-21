<template>
  <div class="bg-blue-500">
    <button @click="load({ query: '3', page: 2, itemsPerPage: 5 })">
      FILTER
    </button>
    <button @click="resetFilters()">
      CLEAR
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
const { load, resetFilters } = store
</script>

<style scoped></style>
