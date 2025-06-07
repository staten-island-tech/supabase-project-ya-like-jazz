<template>
  <div>
    <div
      class="flex container justify-center items-center justify-self-center border-solid border-2 border-black rounded-lg object-cover w-[25%] h-[100%] mt-6 mb-24"
    >
      <div class="object-contain p-2 m-2 justify-items-center">
        <h1 class="text-color-3 font-bold text-[40px]">Welcome!</h1>
        <div class="flex justify-end p-2">
          <input type="text" class="border-solid border-4" placeholder="Email" v-model="username" />
        </div>
        <div class="flex justify-end">
          <input
            type="password"
            class="border-solid border-4"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div class="">
          <Button
            label="Sign Up"
            @click="signUpNewUser()"
            class="m-2 p-2 color-3 text-white"
          ></Button>
        </div>
        <div>
          <h2>Returning User?</h2>
          <router-link to="/login" class="text-color-3 font-bold flex justify-center">
            Click here!
          </router-link>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-md border-black rounded-lg p-4 relative h-64 overflow-visible mt-10 mx-auto"
    >
      <div class="relative w-full h-full">
        <div
          v-for="card in cards"
          :key="card.id"
          class="w-24 h-36 bg-white border-2 border-black rounded-lg shadow-md flex items-center justify-center text-5xl pointer-events-none select-none will-change-transform will-change-opacity z-100 absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-16"
          :ref="(el) => cardRefs.set(card.id, el)"
          style="opacity: 0"
        >
          <img src="https://deckofcardsapi.com/static/img/back.png" />
        </div>

        <img
          v-for="i in 10"
          :key="'placeholder-' + i"
          src="https://deckofcardsapi.com/static/img/back.png"
          class="placeholderCard w-24 h-36 absolute left-1/2 -translate-x-1/2"
          :style="{ bottom: `${i * 6}px`, zIndex: i }"
        />
      </div>
    </div>

    <img
      src="/box.png"
      class="w-50 h-36 absolute top-1/8 left-1/2 h-1/2 -translate-x-1/2 -translate-y-36 z-20"
    />
    <div v-if="eventFinished">
      <cardCoverAnim />
    </div>
  </div>
</template>

<script setup lang="ts">
import cardCoverAnim from '@/components/cardCoverAnim.vue'
import router from '@/router/index.ts'
import { supabase } from '../lib/supabaseClient.ts'
import { ref, reactive, nextTick, onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { gsap } from 'gsap'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { useAnimationStore } from '@/stores/animation.ts'
const animationStore = useAnimationStore()

gsap.registerPlugin(Physics2DPlugin, CustomEase)

const username = ref('')
const password = ref('')
const placeholderAnims: gsap.core.Tween[] = []
const eventFinished = ref(false)

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: username.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:5173/login',
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    alert(`Signup failed: ${error.message}`)
    return
  }

  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    alert('An account with this email already exists. Please check your email to verify it.')
    return
  }

  onLaunchClick()
  animationStore.animation = true
}

onMounted(() => {
  const placeholders = document.querySelectorAll('.placeholderCard')
  if (!placeholders.length) return

  placeholders.forEach((card, index) => {
    gsap.set(card, {
      rotation: 20,
      opacity: 1,
      transformOrigin: 'bottom center',
    })

    const anim = gsap.to(card, {
      rotation: -20,
      opacity: 1,
      duration: 0.5,
      delay: index * 0.1,
      yoyo: true,
      repeat: -1,
      ease: 'power4.inOut',
    })

    placeholderAnims.push(anim)
  })
})

function pausePlaceholderAnimations() {
  placeholderAnims.forEach((anim) => anim.pause())
}

const cards = reactive<{ id: number }[]>([])
let nextId = 0
const cardRefs = new Map<number, HTMLElement>()

function onLaunchClick() {
  pausePlaceholderAnimations()
  placeholderAnims.forEach((anim, i) => {
    gsap.to(anim.targets(), {
      rotation: 0,
      duration: 0.5,
      delay: i * 0.05,
      onComplete: () => {
        gsap.to(anim.targets(), { opacity: 0, duration: 0.5 })
      },
    })
  })
  setTimeout(() => {
    launchTenCards()
  }, 2000)
}

function launchTenCards() {
  for (let i = 0; i < 100; i++) {
    launchCard()
  }
  delayedNavigate()
}

function launchCard() {
  const id = nextId++
  cards.push({ id })

  nextTick(() => {
    setTimeout(() => {
      const el = cardRefs.get(id)
      if (!el) return
      gsap.set(el, {
        scale: 1,
        opacity: 0,
      })

      const tl = gsap.timeline({
        onComplete: () => {
          const index = cards.findIndex((c) => c.id === id)
          if (index !== -1) cards.splice(index, 1)
          cardRefs.delete(id)
        },
      })

      tl.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: 'power4.inOut',
      })
      tl.to(el, {
        duration: 0.1,
        y: -25,
        rotation: gsap.utils.random(-30, 30),
        ease: 'sine.inOut',
        repeat: 5,
        yoyo: true,
      })
      tl.to(el, {
        duration: 0.15,
        y: -30,
        rotation: 0,
        ease: 'sine.inOut',
        repeat: 5,
        yoyo: true,
      })
      tl.to(el, {
        duration: 3,
        scale: 2,
        physics2D: {
          velocity: 1000,
          angle: gsap.utils.random(200, 330),
          gravity: 200,
        },
        rotation: '+=720',
        opacity: 0,
        ease: 'power4.out',
      })
      eventFinished.value = true
    }, 0)
  })
}

function delayedNavigate() {
  setTimeout(() => {
    router.push('/emailverification')
  }, 7000)
}
</script>

<style scoped>
.p-button.color-3 {
  background-color: var(--color-3);
  color: var(--text-color);
}
.p-button.color-3:hover {
  background-color: var(--color-3);
  color: var(--text-color);
}
</style>
