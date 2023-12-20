export interface Coordinates {
  lat: number
  lng: number
}

export interface Activity {
  id: number
  name: string
  coordinates: Coordinates
}
