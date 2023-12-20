<template>
  <div class="grid grid-cols-3 gap-4 h-full p-5">
    <ActivitySearch class="col-span-3" />
    <ActivityList />
    <ClientOnly>
      <ActivityMap class="col-span-2" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
