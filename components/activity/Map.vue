<template>
  <div>
    <LMap :zoom="12" :center="currentCenter" class="rounded-md">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <LMarker
        v-for="activity in activities" :key="activity.id"
        :lat-lng="[activity.coordinates.lat, activity.coordinates.lng]"
        :icon="selected ? activity.id === selected.id ? selectedMarker : baseMarker : baseMarker"
        @click="select(activity)"
      />
    </lMap>
  </div>
</template>

<script setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()

const iconBaseOptions = {
  iconSize: [38, 38],
  iconAnchor: [0, 0],
  iconUrl: '/img/base-marker.png',
}

const baseMarker = L.icon({
  ...iconBaseOptions,
})

const selectedMarker = L.icon({
  ...iconBaseOptions,
  iconUrl: '/img/selected-marker.png',
})

const { activities, selected, currentCenter } = storeToRefs(store)
const { select } = store
</script>
