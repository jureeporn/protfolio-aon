<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const error = ref<string | null>(null)
const routeData = ref<any>(null)
const userLocation = ref<{lat: number, lng: number} | null>(null)
const companyLocation = ref<{lat: number, lng: number} | null>(null)

// Default company location just in case, though API uses config
const defaultCompanyLocation = { lat: 13.804192, lng: 100.536340 }

const calculateRoute = async () => {
  error.value = null
  isLoading.value = true
  routeData.value = null
  userLocation.value = null
  companyLocation.value = null

  if (!navigator.geolocation) {
    error.value = "Geolocation is not supported by your browser."
    isLoading.value = false
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      userLocation.value = { lat, lng }
      companyLocation.value = defaultCompanyLocation

      try {
        const response = await $fetch(`/api/route?lat=${lat}&lng=${lng}`)
        if (response.status === 'success') {
          routeData.value = response.data
        } else {
          error.value = "Failed to calculate route."
        }
      } catch (err: any) {
        console.error(err)
        error.value = err.data?.statusMessage || "An error occurred while fetching the route."
      } finally {
        isLoading.value = false
      }
    },
    (geoError) => {
      console.error(geoError)
      error.value = "Unable to retrieve your location. Please allow location access."
      isLoading.value = false
    }
  )
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
    
    <!-- Background glowing orbs -->
    <div class="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-[50rem] h-[50rem] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/3 mix-blend-screen pointer-events-none"></div>
    
    <div class="max-w-4xl mx-auto space-y-10 relative z-10">
      
      <!-- Header Card (Glassmorphism) -->
      <div class="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-10 text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 group">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 mb-4 tracking-tight">Smart Navigation</h1>
        <p class="text-gray-400 text-lg sm:text-xl font-light max-w-2xl mx-auto">คำนวณระยะทางและเวลาเดินทางที่แม่นยำจากตำแหน่งปัจจุบันของคุณ สู่จุดหมายปลายทาง</p>
        
        <button 
          @click="calculateRoute" 
          :disabled="isLoading"
          class="mt-10 relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
        >
          <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="relative z-10">{{ isLoading ? 'กำลังประมวลผลข้อมูล...' : 'คำนวณเส้นทางทันที' }}</span>
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-500/10 border border-red-500/30 backdrop-blur-md p-5 rounded-2xl animate-pulse">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-red-500/20 p-2 rounded-full">
            <svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-red-300">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Results Card (Glassmorphism) -->
      <div v-if="routeData" class="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden transition-all duration-700 ease-in-out transform origin-top" style="animation: slideDown 0.5s ease-out forwards;">
        
        <!-- Stats Section -->
        <div class="px-8 py-8 border-b border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h3 class="text-2xl font-bold text-white tracking-wide mb-1">สรุปการเดินทาง</h3>
            <p class="text-sm text-gray-400 font-light flex items-center gap-2">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              ประเมินจากสภาพการจราจรแบบ Real-time
            </p>
          </div>
          <div class="flex space-x-10">
            <div class="text-left md:text-right">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">ระยะทาง</p>
              <p class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{{ routeData.distance.text }}</p>
            </div>
            <div class="text-left md:text-right relative">
              <div class="absolute -inset-4 bg-emerald-500/10 blur-xl rounded-full z-0"></div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 relative z-10">เวลาโดยประมาณ</p>
              <p class="text-3xl sm:text-4xl font-black text-emerald-400 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{{ routeData.duration_in_traffic.text || routeData.duration.text }}</p>
            </div>
          </div>
        </div>
        
        <!-- Locations Section -->
        <div class="px-8 py-6 bg-black/20">
           <div class="flex items-start mb-6 relative">
            <div class="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-gradient-to-b from-emerald-500/50 to-rose-500/50"></div>
            <div class="flex-shrink-0 mt-1 relative z-10">
              <div class="w-6 h-6 rounded-full bg-emerald-500 border-4 border-gray-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div class="ml-4">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">จุดเริ่มต้น (Origin)</p>
              <p class="text-base text-gray-200 mt-0.5">{{ routeData.start_address || 'ตำแหน่งปัจจุบันของคุณ' }}</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-1 relative z-10">
              <div class="w-6 h-6 rounded-full bg-rose-500 border-4 border-gray-900 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
            </div>
            <div class="ml-4">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">จุดหมายปลายทาง (Destination)</p>
              <p class="text-base text-gray-200 mt-0.5 font-medium text-blue-300">{{ routeData.end_address || 'บริษัท ของเรา (SCG Head Office)' }}</p>
            </div>
          </div>
        </div>

        <!-- Map Container -->
        <div class="p-4 bg-white/5">
          <div class="rounded-2xl overflow-hidden border border-white/10 shadow-inner relative">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none z-10"></div>
            <MapDisplay 
              :polyline="routeData.polyline" 
              :startLocation="userLocation"
              :endLocation="companyLocation"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
@keyframes slideDown {
  0% { opacity: 0; transform: translateY(-20px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
