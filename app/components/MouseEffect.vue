<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const isVisible = ref(false)

const updateMousePosition = (e: MouseEvent) => {
  x.value = e.clientX
  y.value = e.clientY
  if (!isVisible.value) isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
  document.body.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
  document.body.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <div 
    class="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
  >
    <!-- Spotlight glow that perfectly follows mouse -->
    <div 
      class="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-blue-400/10 dark:bg-blue-500/15 -translate-x-1/2 -translate-y-1/2"
      :style="{ left: `${x}px`, top: `${y}px` }"
    ></div>
    
    <!-- Outer trailing ring -->
    <div 
      class="absolute w-8 h-8 rounded-full border border-blue-500/30 dark:border-blue-400/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      :style="{ left: `${x}px`, top: `${y}px` }"
    ></div>

    <!-- Inner solid dot -->
    <div 
      class="absolute w-2 h-2 rounded-full bg-blue-500/50 dark:bg-blue-400/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
      :style="{ left: `${x}px`, top: `${y}px` }"
    ></div>
  </div>
</template>

<style>
/* Optional: If you want to hide the default cursor entirely on desktop, uncomment below */
/* @media (pointer: fine) {
  body {
    cursor: none;
  }
  a, button, [role="button"] {
    cursor: none;
  }
} */
</style>
