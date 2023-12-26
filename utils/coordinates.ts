import type { Activity, Coordinates } from '~/types'

export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)
export const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI)

export function activitiesCenter(activities: Activity[]): Coordinates {
  const amount = activities.length

  const { lng, lat, z } = activities.reduce(
    (meanCoordinates, activity) => {
      const { lat, lng } = activity.coordinates
      const latRad = degreesToRadians(lat)
      const lngRad = degreesToRadians(lng)

      meanCoordinates.lng += Math.cos(latRad) * Math.cos(lngRad) / amount
      meanCoordinates.lat += Math.cos(latRad) * Math.sin(lngRad) / amount
      meanCoordinates.z += Math.sin(latRad) / amount

      return meanCoordinates
    },
    { lng: 0, lat: 0, z: 0 },
  )

  return {
    lng: radiansToDegrees(Math.atan2(lat, lng)),
    lat: radiansToDegrees(Math.atan2(z, Math.sqrt(lng * lng + lat * lat))),
  }
}
