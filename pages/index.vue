<template>
  <ActivitySearch class="m-5 h-28" />
  <div class="grid grid-cols-3 gap-4 h-full p-5">
    <ActivityList class="min-h-full" />
    <ClientOnly>
      <ActivityMap class="col-span-2" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
