<script setup lang="ts">
import type { Basics } from '~/shared/types/profile'

defineProps<{
  basics: Basics
}>()
</script>

<template>
  <section class="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-b-[4rem] shadow-sm">
    <!-- Abstract ambient background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-200/20 dark:bg-amber-600/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div v-if="basics.avatar" class="mb-10 relative group">
        <div class="absolute inset-0 bg-gradient-to-tr from-amber-200 to-blue-400 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition duration-700"></div>
        <img 
          :src="basics.avatar" 
          :alt="basics.name" 
          class="relative w-44 h-44 object-cover rounded-full border-4 border-white/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-sm"
        />
      </div>

      <p class="text-sm md:text-base uppercase tracking-[0.3em] font-semibold text-slate-500 dark:text-slate-400 mb-4">
        Hello, I'm {{ basics.nickname }}
      </p>

      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
        {{ basics.name }}
      </h1>

      <h2 class="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 font-bold mb-8">
        {{ basics.role }}
      </h2>

      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-light">
        {{ basics.tagline }}
      </p>
    </div>
  </section>
</template>
