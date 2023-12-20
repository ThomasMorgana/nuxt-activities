import type { Activity, Coordinates } from '~/types'
import { degreesToRadians, radiansToDegrees } from '~/utils/coordinates'

// Bordeaux
const BASE_LAT = 44.837789
const BASE_LNG = -0.57918

// All of this should be a call to some backend or database in real life, this is mocked data generation
export default defineEventHandler((_) => {
  const activities: Activity[] = []
  const amount: number = 60

  let avgX = 0
  let avgY = 0
  let avgZ = 0

  function generateActivity(id: number, lat: number, lng: number): Activity {
    return {
      id,
      name: `Activity ${id}`,
      coordinates: {
        lat,
        lng,
      },
    }
  }

  for (let i = 1; i <= amount; i++) {
    const lat = i % 2 ? BASE_LAT + Math.random() / 10 : BASE_LAT - Math.random() / 10
    const lng = i % 3 ? BASE_LNG - Math.random() / 10 : BASE_LNG + Math.random() / 10
    activities.push(generateActivity(i, lat, lng))

    const latRad = degreesToRadians(lat)
    const lngRad = degreesToRadians(lng)

    avgX += Math.cos(latRad) * Math.cos(lngRad) / amount
    avgY += Math.cos(latRad) * Math.sin(lngRad) / amount
    avgZ += Math.sin(latRad) / amount
  }

  // This is used to center the map when no activity is selected, to a pretty good approximation of the "center" of the activities locations
  const mapCenter: Coordinates = {
    lng: radiansToDegrees(Math.atan2(avgY, avgX)),
    lat: radiansToDegrees(Math.atan2(avgZ, Math.sqrt(avgX * avgX + avgY * avgY))),
  }

  return { activities, mapCenter }
})
