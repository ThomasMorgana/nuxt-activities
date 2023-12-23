import { faker } from '@faker-js/faker'
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

  generateActivity(lat: number, lng: number): Activity {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.words({ min: 1, max: 4 }),
      timestamp: faker.date.soon({ days: 7 }).getTime(),
      coordinates: {
        lat,
        lng,
      },
    }
  }

  generateList(amount: number) {
    for (let i = 1; i <= amount; i++) {
      const [lat, lng] = faker.location.nearbyGPSCoordinate({ origin: [this.lat, this.lng] })
      this.activities.push(this.generateActivity(lat, lng))

      const latRad = degreesToRadians(lat)
      const lngRad = degreesToRadians(lng)

      this.avgX += Math.cos(latRad) * Math.cos(lngRad) / amount
      this.avgY += Math.cos(latRad) * Math.sin(lngRad) / amount
      this.avgZ += Math.sin(latRad) / amount
    }

    // This is used to center the map when no activity is selected to a pretty good approximation of the "center" of the activities locations
    // We could use the utils function (used in the store), but as we're generating the activities here, we can calculate that on the fly and avoid a for loop call
    this.mapCenter = {
      lng: radiansToDegrees(Math.atan2(this.avgY, this.avgX)),
      lat: radiansToDegrees(Math.atan2(this.avgZ, Math.sqrt(this.avgX * this.avgX + this.avgY * this.avgY))),
    }
  }
}
