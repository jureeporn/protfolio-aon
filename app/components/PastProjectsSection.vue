<script setup lang="ts">
import type { PastProject } from '~/shared/types/profile'

defineProps<{
  projects: PastProject[]
}>()
</script>

<template>
  <section v-if="projects && projects.length > 0" class="max-w-4xl mx-auto py-12">
    <div class="text-center mb-16">
      <h3 class="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
        Other Collaborations & Past Work
      </h3>
      <p class="text-slate-500 dark:text-slate-400">
        Additional projects I've contributed to throughout my career.
      </p>
    </div>

    <div class="space-y-6">
      <div 
        v-for="project in projects" 
        :key="project.name"
        class="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
      >
        <div class="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <div>
          <h4 class="text-xl font-bold text-slate-800 dark:text-slate-200">{{ project.name }}</h4>
          <p class="text-slate-500 dark:text-slate-400 mt-1">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
