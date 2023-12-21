import type { Activity, Coordinates } from '~/types'

export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)
export const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI)

export function activitiesCenter(activities: Activity[]): Coordinates {
  let avgX: number = 0
  let avgY: number = 0
  let avgZ: number = 0

  const amount = activities.length

  for (const activity of activities) {
    const { lat, lng } = activity.coordinates
    const latRad = degreesToRadians(lat)
    const lngRad = degreesToRadians(lng)

    avgX += Math.cos(latRad) * Math.cos(lngRad) / amount
    avgY += Math.cos(latRad) * Math.sin(lngRad) / amount
    avgZ += Math.sin(latRad) / amount
  }

  return {
    lng: radiansToDegrees(Math.atan2(avgY, avgX)),
    lat: radiansToDegrees(Math.atan2(avgZ, Math.sqrt(avgX * avgX + avgY * avgY))),
  }
}
