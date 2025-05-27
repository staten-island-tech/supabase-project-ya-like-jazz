<template>
  <div>
    <h1>Hello</h1>
    <button @click="getCard()">Hi</button>
    <button @click="getCard1()">Hi</button>
    <button @click="getCard2()">Hi</button>
  </div>
</template>

<script setup>
async function getCard() {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/draw/?count=52`)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
    }
  } catch (error) {
    alert(error)
  }
}
async function getCard1() {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/add/?cards=4S,3S`,
    )
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
    }
  } catch (error) {
    alert(error)
  }
}
async function getCard2() {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/`)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
      const data1 = data.piles.player.cards
/*       data1.forEach((data1) => {
        console.log(data1.code)
      }) */
    }
  } catch (error) {
    alert(error)
  }
}

async function endGame1() {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/return/`)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
    }
  } catch (error) {
    alert(error)
  }
}
</script>

<style lang="scss" scoped></style>
