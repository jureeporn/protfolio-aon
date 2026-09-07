<script setup lang="ts">
import type { Profile } from '~/shared/types/profile'

defineProps<{
  skills: Profile['skills']
}>()
</script>

<template>
  <section class="max-w-5xl mx-auto">
    <h3 class="text-3xl md:text-4xl font-extrabold mb-10 text-center text-slate-800 dark:text-slate-100">
      Skills & Expertise
    </h3>
    
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Current Skills -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </div>
          <h4 class="text-2xl font-bold text-slate-800 dark:text-slate-200">Current Arsenal</h4>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="skill in skills.current" 
            :key="skill"
            class="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold tracking-wide border border-blue-100 dark:border-blue-800/30 shadow-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Learning -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600 dark:text-emerald-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h4 class="text-2xl font-bold text-slate-800 dark:text-slate-200">Exploring</h4>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="skill in skills.learning" 
            :key="skill"
            class="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-semibold tracking-wide border border-emerald-100 dark:border-emerald-800/30 shadow-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
