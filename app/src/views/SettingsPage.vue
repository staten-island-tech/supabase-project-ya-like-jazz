<template>
  <div>
    <div class="flex h-screen bg-1">
      <div class="w-64 flex justify-end p-5">
        <tabSettings />
        <p class="mt-2"></p>
      </div>
      <div class="flex-1 p-5">
        <div v-if="tab === 1">
          <settingsThemes />
        </div>
        <div v-if="tab === 2">
          <settingsCollection />
        </div>
        <div v-if="tab === 3">
          <settingsProfile />
        </div>
        <div v-if="tab === 4">
          <settingsLogout />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import tabSettings from '@/components/settingsComps/tabSettings.vue'
import settingsThemes from '@/components/settingsComps/settingsThemes.vue'
import settingsCollection from '@/components/settingsComps/settingsCollection.vue'
import settingsProfile from '@/components/settingsComps/settingsProfile.vue'
import settingsLogout from '@/components/settingsComps/settingsLogout.vue'
import { useTab } from '@/stores/useTab'

const { tab } = useTab()
</script>

<style lang="scss" scoped></style>
