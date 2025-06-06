  <template>
    <div>
      <h1 class="text-6xl text-center text-textcolor2 p-2">Change Your Profile Picture</h1>
      <h1 class="text-2xl text-center text-textcolor2 p-2">
        Enter a link to change your current profile picture
      </h1>
      <h1 class="text-sm text-center text-textcolor2 p-2 mb-2">
        Note: leaving the box empty resets your profile picture to the default
      </h1>

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
<div class="absolute top-[15rem] left-1/2 w-1/2 h-1/2 -translate-x-1/2 z-10">

          <div
            v-for="(angle, i, number) in angles"
            :key="i"
            class="card absolute top-0 left-1/2 w-48 h-72"
            :ref="(element) => (cards[i] = element)"
          >
            <img
              :src="`https://deckofcardsapi.com/static/img/${numbers[i]}.png`"
              class="w-full h-full object-cover rounded shadow-md"
            />
          </div>
          </div>
    </div>
  </template>

  <script setup lang="ts">
  import { useSettingsStore } from '@/stores/settings'
  import { onMounted, ref } from 'vue'
  import { gsap } from 'gsap'
  const settingsStore = useSettingsStore()


  const angles = [-60, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260]
  const numbers = [
    'back',
    'back',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    '0S',
    'JS',
    'QS',
    'KS',
    'AS',
    'back',
    'back',
  ]
  const cards = ref([])

  onMounted(() => {
    cards.value.forEach((card, i) => {
      gsap.set(card, {
        rotation: 0,
        opacity: 0,
        x: '0px',
        y: '800px',
        transformOrigin: '0px 400px',
      })

      gsap.to(card, {
        y: i * 5,
        rotation: angles[i],
        opacity: 1,
        duration: 3.2,
        delay: i * 0.1,
        yoyo: true,
        repeat: -1,
        translateY: '-1000px',
        ease: 'expo.inOut',
      })
    })
  })


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
    if (text.value === '') {
      settingsStore.pfp =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'
    } else if (!isValidUrl(text.value)) {
      alert(`Not a valid link!`)
    } else {
      console.log(`${text.value}`)
      settingsStore.pfp = `${text.value}`
    }
  }
  </script>

  <style lang="scss" scoped></style>
