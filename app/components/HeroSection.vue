<script setup lang="ts">
import type { Profile } from '~/shared/types/profile'

defineProps<{
  basics: Profile['basics']
}>()
</script>

<template>
  <section class="text-center py-16 md:py-24 relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="relative z-10 px-6 flex flex-col items-center">
      <div v-if="basics.avatarUrl" class="mb-6 relative group">
        <div class="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <img 
          :src="basics.avatarUrl" 
          :alt="basics.name" 
          class="relative w-40 h-40 object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-xl"
        />
      </div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-center">
        {{ basics.name }}
      </h1>
      <h2 class="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-2 font-semibold tracking-wide">
        {{ basics.position }}
      </h2>
      <h3 class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-8 font-medium tracking-wide">
        AKA {{ basics.nickname }}
      </h3>
      <p class="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
        {{ basics.hobby }}
      </p>
    </div>
    
    <!-- Decorative background blobs -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
  </section>
</template>
