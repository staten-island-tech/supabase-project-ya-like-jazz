<template>
  <div>
    <div></div>
    <div
      class="flex flex-col items-center gap-2 w-full p-2 border-2 opacity-30 "
      :class="{ 'opacity-100': isInArray }"
    >
      <h1 class="text-lg font-semibold">{{ card.value }} OF {{ card.suit }}</h1>
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
const props = defineProps({
  card: Object,
})
const test = ref([])
  async function getCard2() {
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/`)
      if (res.status > 200) {
        throw new Error(res)
      } else {
        const data = await res.json()
        const cards = data.piles.player.cards
        saveToArray(cards)
      }
    } catch (error) {
      alert("rjgtrhnfkmfldp;")
    }
  }

function saveToArray(cards) {
  cards.forEach((card) => {
    test.value.push(card.code)
  })

}

const isInArray = computed(() => {
  return test.value.includes(props.card.code)
})

onMounted(() => {
  getCard2()
})

</script>

<style lang="scss" scoped></style>
