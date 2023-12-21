<template>
  <div class="bg-blue-500">
    <button @click="store.loadAll({ query: '3', page: 2, itemsPerPage: 5 })">
      FILTER
    </button>
    <button @click="store.loadAll()">
      CLEAR
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
</script>

<style scoped></style>
