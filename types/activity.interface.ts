export interface Coordinates {
  lat: number
  lng: number
}

export interface Activity {
  id: number
  name: string
  coordinates: Coordinates
}

export interface Filters {
  query?: string
  page?: number
  itemsPerPage?: number
}
