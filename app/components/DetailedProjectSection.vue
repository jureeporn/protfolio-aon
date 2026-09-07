<script setup lang="ts">
import type { FeaturedProject } from '~/shared/types/profile'

defineProps<{
  projects: FeaturedProject[]
}>()
</script>

<template>
  <section v-if="projects && projects.length > 0" class="max-w-6xl mx-auto">
    <h3 class="text-3xl md:text-4xl font-extrabold mb-10 text-center text-slate-800 dark:text-slate-100">
      Featured Experience
    </h3>
    
    <div class="space-y-12">
      <div 
        v-for="project in projects" 
        :key="project.name"
        class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
      >
        <!-- Background Decoration -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div class="relative z-10">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h4 class="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2">
                {{ project.name }}
              </h4>
              <p class="text-xl text-blue-600 dark:text-blue-400 font-bold">
                {{ project.role }}
              </p>
            </div>
            <div class="flex gap-4">
              <a v-if="project.github" :href="project.github" target="_blank" class="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                GitHub Repo
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" class="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-md text-sm">
                Live Demo
              </a>
            </div>
          </div>

          <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {{ project.description }}
          </p>

          <div class="grid md:grid-cols-2 gap-10">
            <!-- Highlights -->
            <div>
              <h5 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Key Highlights
              </h5>
              <ul class="space-y-3">
                <li v-for="(highlight, idx) in project.highlights" :key="idx" class="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                  <span class="leading-relaxed">{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Technologies -->
            <div>
              <h5 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Technologies Used
              </h5>
              <div class="flex flex-wrap gap-2.5">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
