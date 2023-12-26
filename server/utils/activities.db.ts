import { faker } from '@faker-js/faker'
import type { Activity, Coordinates } from '~/types'

// Bordeaux
const DEFAULT_LAT = 44.837789
const DEFAULT_LNG = -0.57918
const DEFAULT_AMOUNT = 100

class ActivityDB {
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
    }
  }
}

export const activityDB = new ActivityDB()
