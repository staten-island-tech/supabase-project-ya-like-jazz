<template>
    <div>
        <div>
        <h1> {{ card }}</h1>
        </div>
    </div>
</template>

<script setup>
import { Card } from 'primevue';

const props = defineProps({
    card: Object,
})
</script>

<style lang="scss" scoped>

</style>