interface Location {
  lat: number
  long: number
}

interface Activity {
  id: number
  name: string
  location: Location
}

export default defineEventHandler((_) => {
  function generateRandomActivity(id: number): Activity {
    return {
      id,
      name: `Activity ${id}`,
      location: {
        lat: Math.random() * 90,
        long: Math.random() * 180,
      },
    }
  }

  const activities: Activity[] = []

  for (let i = 1; i <= 20; i++)
    activities.push(generateRandomActivity(i))

  return activities
})
