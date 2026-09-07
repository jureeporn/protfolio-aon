<script setup lang="ts">
import type { WorkHistory } from '~/shared/types/profile'

defineProps<{
  workHistory: WorkHistory[]
}>()
</script>

<template>
  <section v-if="workHistory && workHistory.length > 0" class="max-w-4xl mx-auto">
    <h3 class="text-3xl md:text-4xl font-extrabold mb-10 text-center text-slate-800 dark:text-slate-100">
      Experience
    </h3>
    
    <div class="space-y-8">
      <div 
        v-for="(job, index) in workHistory" 
        :key="index"
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <!-- Accent line -->
        <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h4 class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ job.position }}</h4>
          <span class="inline-block mt-2 sm:mt-0 text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg font-medium">
            {{ job.startDate }} &mdash; {{ job.endDate || 'Present' }}
          </span>
        </div>
        
        <h5 class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">{{ job.company }}</h5>
        
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {{ job.description }}
        </p>
      </div>
    </div>
  </section>
</template>
