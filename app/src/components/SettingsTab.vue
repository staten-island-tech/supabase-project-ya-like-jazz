<template>
    <div>
        <ul>
            <li @click="changeTab(1)"> General </li>
            <li @click="changeTab(2)"> Random1 </li>
            <li @click="changeTab(3)"> Random2 </li>
            <li @click="changeTab(4)"> Random3 </li>
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

<style lang="scss" scoped>

</style>