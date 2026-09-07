<script setup lang="ts">
import type { Profile } from '~/shared/types/profile'

const { data: profile, pending, error } = await useAsyncData<Profile>('profile', async () => {
  // We can fetch from an API or just dynamically import the JSON file directly.
  // Dynamic import works beautifully in Nuxt 3/4.
  const profileData = await import('~/data/profile.json')
  return profileData.default as Profile
})

useSeoMeta({
  title: () => profile.value ? `${profile.value.basics.name} | Portfolio` : 'Portfolio',
  description: () => profile.value?.basics.hobby || 'My professional portfolio',
})
</script>

<template>
  <div>
    <div v-if="pending" class="flex justify-center items-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500 py-12">
      <p>Failed to load profile data.</p>
    </div>

    <div v-else-if="profile" class="space-y-24 pb-20">
      <HeroSection :basics="profile.basics" />
      <SkillTags :skills="profile.skills" />
      <ExperienceSection :workHistory="profile.workHistory" />
      <ProjectGrid :projects="profile.projects" />
    </div>
  </div>
</template>
