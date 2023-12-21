<template>
  <ActivitySearch class="mx-5 py-2 h-1/6" />
  <div class="grid grid-cols-3 gap-4 h-4/5 p-5">
    <ActivityList class="min-h-full" />
    <ClientOnly>
      <ActivityMap class="col-span-2" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const store = useActivitiesStore()

if (!store.initialLoad)
  await store.load()
</script>

<style scoped></style>
