import company from '../../config/company.json'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const originLat = parseFloat(query.lat as string)
  const originLng = parseFloat(query.lng as string)

  if (!originLat || !originLng) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing origin coordinates (lat, lng)'
    })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey || apiKey === 'ใส่_KEY_ของคุณที่นี่') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Maps API Key is not configured'
    })
  }

  // Use the new Google Maps Routes API
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  
  const body = {
    origin: {
      location: {
        latLng: {
          latitude: originLat,
          longitude: originLng
        }
      }
    },
    destination: {
      location: {
        latLng: {
          latitude: company.lat,
          longitude: company.lng
        }
      }
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE'
  }

  try {
    const response: any = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Request specific fields to reduce payload and cost
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      },
      body
    })
    
    if (!response.routes || response.routes.length === 0) {
       throw createError({
        statusCode: 500,
        statusMessage: 'No route found'
      })
    }

    const route = response.routes[0]
    
    // Format distance
    const distKm = (route.distanceMeters / 1000).toFixed(1)
    
    // Format duration (comes as "1234s")
    const durationSeconds = parseInt(route.duration)
    const durationMins = Math.ceil(durationSeconds / 60)
    let durationText = `${durationMins} นาที`
    if (durationMins >= 60) {
      const hours = Math.floor(durationMins / 60)
      const mins = durationMins % 60
      durationText = `${hours} ชม. ${mins} นาที`
    }

    return {
      status: 'success',
      data: {
        distance: { text: `${distKm} กม.` },
        duration: { text: durationText },
        duration_in_traffic: { text: durationText },
        polyline: route.polyline.encodedPolyline,
        start_address: null, // Routes API doesn't return addresses by default to save cost
        end_address: null
      }
    }
  } catch (error: any) {
    console.error('Error fetching directions:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.data?.error?.message || 'Failed to calculate route using Routes API'
    })
  }
})
