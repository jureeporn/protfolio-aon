<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  polyline: string | null
  startLocation: { lat: number, lng: number } | null
  endLocation: { lat: number, lng: number } | null
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: google.maps.Map | null = null
let pathPolyline: google.maps.Polyline | null = null
let startMarker: google.maps.Marker | null = null
let endMarker: google.maps.Marker | null = null

const config = useRuntimeConfig()
const apiKey = config.public.googleMapsApiKey

useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`,
      async: true,
      defer: true,
      onload: () => {
        initMap()
      }
    }
  ]
})

const initMap = () => {
  if (!mapContainer.value || !window.google) return

  // Default to Bangkok
  const defaultCenter = { lat: 13.7563, lng: 100.5018 }
  
  map = new window.google.maps.Map(mapContainer.value, {
    zoom: 12,
    center: props.startLocation || defaultCenter,
    mapTypeId: 'roadmap'
  })

  drawRoute()
}

const drawRoute = () => {
  if (!map || !window.google) return

  // Clear previous
  if (pathPolyline) pathPolyline.setMap(null)
  if (startMarker) startMarker.setMap(null)
  if (endMarker) endMarker.setMap(null)

  if (!props.polyline || !props.startLocation || !props.endLocation) return

  const decodedPath = window.google.maps.geometry.encoding.decodePath(props.polyline)

  pathPolyline = new window.google.maps.Polyline({
    path: decodedPath,
    geodesic: true,
    strokeColor: '#3B82F6', // Tailwind blue-500
    strokeOpacity: 0.8,
    strokeWeight: 5
  })

  pathPolyline.setMap(map)

  startMarker = new window.google.maps.Marker({
    position: props.startLocation,
    map: map,
    title: 'Your Location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  })

  endMarker = new window.google.maps.Marker({
    position: props.endLocation,
    map: map,
    title: 'Destination',
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  })

  // Fit bounds
  const bounds = new window.google.maps.LatLngBounds()
  decodedPath.forEach(point => bounds.extend(point))
  map.fitBounds(bounds)
}

watch(() => props.polyline, () => {
  drawRoute()
})
</script>

<template>
  <div class="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
    <div v-if="!apiKey || apiKey === 'ใส่_KEY_ของคุณที่นี่'" class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 flex-col gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span class="text-sm font-medium">Please configure Google Maps API Key</span>
    </div>
    <div v-else ref="mapContainer" class="w-full h-full bg-gray-50"></div>
  </div>
</template>
