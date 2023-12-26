export interface Coordinates {
  lat: number
  lng: number
}

export interface Activity {
  readonly id: string
  readonly name: string
  readonly coordinates: Coordinates
  readonly timestamp: number
}

export interface Filters {
  itemsPerPage?: number
  page?: number
  query?: string
}
