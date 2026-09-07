<script setup lang="ts">
import type { Project } from '~/shared/types/profile'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <section v-if="projects && projects.length > 0" class="max-w-6xl mx-auto">
    <h3 class="text-3xl md:text-4xl font-extrabold mb-10 text-center text-slate-800 dark:text-slate-100">
      Selected Projects
    </h3>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="project in projects" 
        :key="project.name"
        class="group flex flex-col bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-1"
      >
        <div class="flex-1">
          <h4 class="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
            {{ project.name }}
          </h4>
          <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {{ project.description }}
          </p>
        </div>
        
        <div v-if="project.url" class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50">
          <a 
            :href="project.url" 
            target="_blank" 
            class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Explore Project 
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
