<template>
  <div class="container w-20 flex justify-end">
    <ul class="bg-2 h-fit p-6 rounded-lg">
      <li
        @click="changeTab(1)"
        class="cursor-pointer text-xl text-textcolor hover:bg-hover3 rounded-lg h-8 flex justify-end"
      >
        Theme
      </li>
      <li
        @click="changeTab(2)"
        class="cursor-pointer text-xl mt-2 text-textcolor hover:bg-hover3 rounded-lg h-8 flex justify-end"
      >
        Card Collection
      </li>
      <li
        @click="changeTab(3)"
        class="cursor-pointer text-xl mt-2 text-textcolor hover:bg-hover3 rounded-lg h-8 flex justify-end"
      >
        Profile Picture
      </li>
      <li
        @click="changeTab(4)"
        class="cursor-pointer text-xl mt-2 text-textcolor hover:bg-hover3 rounded-lg h-8 flex justify-end w-36"
      >
        Log Out
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useTab } from '@/stores/useTab'

const { tab } = useTab()

function changeTab(value: number) {
  tab.value = value
}
</script>

<style lang="scss" scoped></style>
