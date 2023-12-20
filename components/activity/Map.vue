<template>
  <div>
    <LMap
      :zoom="12"
      :center="store.centerCoordinates"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="activity in activities" :key="activity.id" :lat-lng="[activity.coordinates.lat, activity.coordinates.lng]"
        :icon="selected ? activity.id === selected.id ? selectedMarker : baseMarker : baseMarker"
        @click="store.select(activity)"
      />
    </lMap>
  </div>
</template>

<script setup>
import { useActivitiesStore } from '~/stores/activities'

const store = useActivitiesStore()
const baseMarker = L.icon({
  iconUrl: '/img/base-marker.png',
  iconSize: [38, 38],
  iconAnchor: [0, 0],
})

const selectedMarker = L.icon({
  iconUrl: '/img/selected-marker.png',
  iconSize: [38, 38],
  iconAnchor: [0, 0],
})

await store.loadAll()

// Q: Y a t'il un intérêt à utiliser des computed plutôt que des gettrs ?
const activities = computed(() => store.activities)
const selected = computed(() => store.selected)

// TODO: make this work reactively if possible, but it may need an access to the child component I guess ?
// Note : Leaflet allows for custom html markers "DivIcon" => could work with a custom css rule instead ?
// function getMarker(){}
</script>

<style>
</style>
