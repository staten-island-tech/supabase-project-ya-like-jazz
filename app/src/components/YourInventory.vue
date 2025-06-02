<template>
  <div>
    <div @click="checkStats()"
      class="flex flex-col items-center gap-2 w-full p-2 border-2"
      :class="{ 'opacity-100': isInArray, 'opacity-30': !isInArray }"
    >
      <h1 class="text-lg font-semibold text-textcolor2">{{ card.value }} OF {{ card.suit }}</h1>
      <div class="relative w-58 h-64">
        <img :src="card.image" class="w-full h-full filter brightness-100" />
        <div class="absolute inset-0 bg-gradient-to-r from-1 to-gradient opacity-30"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Card } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function checkStats(){
  let cardLetter = props.card?.value.slice(0,1)
  if (cardLetter === '1'){
    cardLetter = '0'
  }
  const cardSuit = props.card?.suit.slice(0,1)
  router.push(`/cardprofile/${cardLetter}${cardSuit}`)
}

const props = defineProps({
  card: Object,
  ownedCards: {
    type: Array,
    default: () => [],
  },
})

const isInArray = computed(() => {
  return props.ownedCards.includes(props.card.code)
})
</script>

<style lang="scss" scoped></style>
