<script setup lang="ts">
import type { Personal } from '~/shared/types/profile'

defineProps<{
  personal: Personal
}>()
</script>

<template>
  <section class="max-w-6xl mx-auto py-12">
    <h3 class="text-3xl md:text-4xl font-extrabold mb-16 text-center text-slate-800 dark:text-slate-100">
      Beyond the Code
    </h3>
    
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Hobbies Card -->
      <div class="group relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-500">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-amber-100 dark:bg-amber-900/30 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
        
        <div class="relative z-10">
          <div class="aspect-video w-full mb-8 overflow-hidden rounded-2xl shadow-sm">
            <img src="/sourdough.jpg" alt="Sourdough Baking" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          </div>
          
          <div class="space-y-6">
            <div v-for="hobby in personal.hobbies" :key="hobby.title">
              <h4 class="text-xl font-bold text-slate-800 dark:text-amber-400 mb-2">{{ hobby.title }}</h4>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ hobby.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pets Card -->
      <div class="group relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-500">
        <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-orange-100 dark:bg-orange-900/30 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
        
        <div class="relative z-10 flex flex-col h-full">
          <div class="aspect-video w-full mb-8 overflow-hidden rounded-2xl shadow-sm">
            <img src="/cats.jpg" alt="My Cats" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          </div>
          
          <div class="mt-auto">
            <h4 class="text-xl font-bold text-slate-800 dark:text-orange-400 mb-2">{{ personal.pets.title }}</h4>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ personal.pets.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
