import type { Activity, Coordinates } from '~/types'
import { degreesToRadians, radiansToDegrees } from '~/utils/coordinates'

export default class ActivityList {
// Bordeaux
  BASE_LAT = 44.837789
  BASE_LNG = -0.57918
  activities: Activity[] = []
  mapCenter: Coordinates = { lat: 0, lng: 0 }
  amount: number = 60
  avgX = 0
  avgY = 0
  avgZ = 0

  constructor() {}

  generateActivity(id: number, lat: number, lng: number): Activity {
    return {
      id,
      name: `Activity ${id}`,
      coordinates: {
        lat,
        lng,
      },
    }
  }

  generateList(amount: number) {
    for (let i = 1; i <= amount; i++) {
      const lat = i % 2 ? this.BASE_LAT + Math.random() / 10 : this.BASE_LAT - Math.random() / 10
      const lng = i % 3 ? this.BASE_LNG - Math.random() / 10 : this.BASE_LNG + Math.random() / 10
      this.activities.push(this.generateActivity(i, lat, lng))

      const latRad = degreesToRadians(lat)
      const lngRad = degreesToRadians(lng)

      this.avgX += Math.cos(latRad) * Math.cos(lngRad) / amount
      this.avgY += Math.cos(latRad) * Math.sin(lngRad) / amount
      this.avgZ += Math.sin(latRad) / amount
    }

    // This is used to center the map when no activity is selected to a pretty good approximation of the "center" of the activities locations
    this.mapCenter = {
      lng: radiansToDegrees(Math.atan2(this.avgY, this.avgX)),
      lat: radiansToDegrees(Math.atan2(this.avgZ, Math.sqrt(this.avgX * this.avgX + this.avgY * this.avgY))),
    }
  }
}
