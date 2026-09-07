<script setup lang="ts">
import type { Profile } from '~/shared/types/profile'

const { data: profile, pending, error } = await useAsyncData<Profile>('profile', async () => {
  const profileData = await import('~/data/profile.json')
  return profileData.default as Profile
})

const { data: fixAsset } = await useAsyncData('fixAsset', async () => {
  const data = await import('~/data/my-fixasset.json')
  return data.default.projects
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
      <DetailedProjectSection v-if="fixAsset" :projects="fixAsset" />
      <SkillTags :skills="profile.skills" />
      <ExperienceSection :workHistory="profile.workHistory" />
      <ProjectGrid :projects="profile.projects" />
    </div>
  </div>
</template>
