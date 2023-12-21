import type { Activity, Coordinates } from '~/types'
import { degreesToRadians, radiansToDegrees } from '~/utils/coordinates'

// Bordeaux
const DEFAULT_LAT = 44.837789
const DEFAULT_LNG = -0.57918
const DEFAULT_AMOUNT = 100

export default class ActivityDB {
  lat: number
  lng: number
  amount: number

  activities: Activity[] = []
  mapCenter: Coordinates = { lat: 0, lng: 0 }
  avgX = 0
  avgY = 0
  avgZ = 0

  constructor(lat: number = DEFAULT_LAT, lng: number = DEFAULT_LNG, amount: number = DEFAULT_AMOUNT) {
    this.lat = lat
    this.lng = lng
    this.amount = amount
    this.generateList(this.amount)
  }

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
      const lat = i % 2 ? this.lat + Math.random() / 10 : this.lat - Math.random() / 10
      const lng = i % 3 ? this.lng - Math.random() / 10 : this.lng + Math.random() / 10
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
