export interface Coordinates {
  lat: number
  lng: number
}

export interface Activity {
  id: string
  name: string
  timestamp: number
  coordinates: Coordinates
}

export interface Filters {
  query?: string
  page?: number
  itemsPerPage?: number
}
