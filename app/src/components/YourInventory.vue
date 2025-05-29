<template>
  <div>
   <div
  class="flex flex-col items-center gap-2 w-full p-2 border-2"
  :class="{ 'opacity-100': isInArray, 'opacity-30': !isInArray }"
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
  ownedCards: {
    type: Array,
    default: () => []
  }
})

const isInArray = computed(() => {
  return props.ownedCards.includes(props.card.code)
})
const obtained = ref([])
  async function checkInventory() {
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/`)
      if (res.status > 200) {
        throw new Error(res)
      } else {
        const data = await res.json()
        obtained.value = data.piles.player.cards.map(card => card.code)
        /* saveToArray(cards) */
      }
    } catch (error) {
      alert("rjgtrhnfkmfldp;")
    }
  }

function saveToArray(cards) {
  cards.forEach((card) => {
    obtained.value.push(card.code)
  })

}


onMounted(() => {

})

</script>

<style lang="scss" scoped></style>
