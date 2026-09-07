<script setup lang="ts">
import type { PortfolioData } from '~/shared/types/profile'

const { data: portfolio, pending, error } = await useAsyncData<PortfolioData>('portfolio', async () => {
  const data = await import('~/data/portfolio-data.json')
  return data.default as PortfolioData
})

useSeoMeta({
  title: () => portfolio.value ? `${portfolio.value.basics.name} | Portfolio` : 'Portfolio',
  description: () => portfolio.value?.basics.tagline || 'My professional portfolio',
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 selection:bg-blue-200 dark:selection:bg-blue-900/50">
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500 py-24 min-h-screen flex items-center justify-center">
      <div class="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <p class="text-lg font-bold">Failed to load portfolio data.</p>
      </div>
    </div>

    <div v-else-if="portfolio" class="space-y-32 pb-32">
      <HeroSection :basics="portfolio.basics" />
      
      <div class="px-4 md:px-8 space-y-32">
        <DetailedProjectSection :projects="portfolio.featuredProjects" />
        
        <PastProjectsSection :projects="portfolio.pastProjects" />
        
        <SkillTags :skills="portfolio.skills" />
        
        <PersonalSection :personal="portfolio.personal" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
}
</style>
