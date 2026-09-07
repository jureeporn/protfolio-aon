<script setup lang="ts">
import type { Skills } from '~/shared/types/profile'

defineProps<{
  skills: Skills
}>()
</script>

<template>
  <section class="max-w-6xl mx-auto py-12">
    <div class="text-center mb-16">
      <h3 class="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
        Technical Arsenal
      </h3>
      <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        Tools and technologies I use to build robust and scalable systems.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Core Skills -->
      <div class="bg-white dark:bg-slate-800 p-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
        <h4 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          Core Stack
        </h4>
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="skill in skills.core" 
            :key="skill"
            class="px-5 py-2.5 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all cursor-default"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Learning & AI -->
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-10 rounded-[2rem] shadow-sm border border-indigo-100 dark:border-indigo-800/30">
        <h4 class="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-8 flex items-center gap-3">
          <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Current Focus & AI
        </h4>
        <div class="space-y-6">
          <div v-for="learning in skills.learning" :key="learning.topic" class="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl backdrop-blur-sm">
            <h5 class="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">{{ learning.topic }}</h5>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{{ learning.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
