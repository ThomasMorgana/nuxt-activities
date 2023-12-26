import { faker } from '@faker-js/faker'
import type { Activity, Coordinates } from '~/types'

// Bordeaux
// These could probably be env variable
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

      // ALL THESE COMMENTS ARE FROM THE PoC, but I really liked the idea so I keep it as a memory
      // (+ it could be usefull to the backend team to know it can be calculated on the fly),
      // Would've commented the US/Issue/Ticket IRL
      // const latRad = degreesToRadians(lat)
      // const lngRad = degreesToRadians(lng)

      // this.avgX += Math.cos(latRad) * Math.cos(lngRad) / amount
      // this.avgY += Math.cos(latRad) * Math.sin(lngRad) / amount
      // this.avgZ += Math.sin(latRad) / amount
    }
  }
}

// Initialise here to keep the same DB for both server functions
export const activityDB = new ActivityDB()
