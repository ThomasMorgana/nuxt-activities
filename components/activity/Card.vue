<template>
  <div class="flex min-w-0 gap-x-4">
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-gray-900">
        {{ activity.name }}
      </p>
      <p class="mt-1 truncate text-xs leading-5 text-gray-500">
        {{ activity.id }}
      </p>
    </div>
  </div>
  <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
    <p class="text-sm leading-6 text-gray-900">
      {{ coordinatesToString(activity.coordinates) }}
    </p>
    <p class="mt-1 text-xs leading-5 text-gray-500">
      <time :datetime="date.toISOString()">
        {{ date.toDateString() }}
      </time>
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Activity, Coordinates } from '~/types'

const { activity } = defineProps({
  activity: {
    type: Object as PropType<Activity>,
    required: true,
  },
})

const date = new Date(activity.timestamp)

const coordinatesToString = (c: Coordinates) => `lat: ${c.lat.toFixed(5)} ; lng:  ${c.lng.toFixed(5)}`
</script>
