<template>
    <div>
      <h1 class="text-6xl text-center p-2"> Change Your Profile Picture </h1>
        <h1 class="text-2xl text-center p-2"> Enter a link to change your current profile picture </h1>
        <h1 class="text-sm text-center p-2"> Note: leaving the box empty resets your profile picture to the default </h1>
    
    <div class="flex justify-center">
        <input
      v-model="text"
      type="text"
      placeholder="Image URL"
      class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="changePfp()"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Enter
    </button>
    </div>
    <div class="flex justify-center p-2">
        <img :src="settingsStore.pfp" class="w-80 h-80" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { ref } from 'vue'
const settingsStore = useSettingsStore()

const text = ref('')

function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}


async function changePfp() {
  if (text.value === ""){
    settingsStore.pfp = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
  } else if (!isValidUrl(text.value)) {
         alert(`Not a valid link!`)
  } else {
    console.log(`${text.value}`)
    settingsStore.pfp = `${text.value}`
  }



}
</script>

<style lang="scss" scoped>

</style>