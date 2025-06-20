<template>
  <div
    :data-theme="settingsStore.currentTheme"
    class="min-h-screen bg-1"
    @click="listener && listenerOff()"
  >
    <header>
      <nav
        class="fixed top-0 left-0 right-0 z-50 bg-2 h-16 p-2 flex justify-between items-center shadow-md"
      >
        <div>
          <RouterLink class="bg-3 hover:bg-hover3 text-textcolor py-2 px-4 rounded" to="/"
            >Home</RouterLink
          >
        </div>

        <div class="flex justify-end">
          <RouterLink
            v-if="!verified"
            class="bg-3 hover:bg-hover3 text-textcolor py-2 px-4 rounded"
            to="/register"
          >
            Register
          </RouterLink>
          <RouterLink
            v-if="!verified"
            class="bg-3 hover:bg-hover3 text-textcolor py-2 px-4 rounded ml-2"
            to="/login"
          >
            Log In
          </RouterLink>

          <div
            class="w-10 h-10 ml-2 rounded-full bg-gray-500 flex items-center justify-center text-textcolor text-xl font-bold cursor-pointer"
            @click="toggleDropdown()"
            v-if="verified"
          >
            <img
              :src="settingsStore.pfp"
              class="w-full h-full object-cover rounded-full"
              draggable="false"
            />
          </div>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 bg-2 text-textcolor rounded-md shadow-lg mt-16 mr-4 w-40 p-2"
          >
            <ul>
              <li class="py-1 px-2 hover:bg-hover3 cursor-pointer" @click="router.push('/profile')">
                Profile
              </li>
              <li
                class="py-1 px-2 hover:bg-hover3 cursor-pointer"
                @click="router.push('/settings')"
              >
                Settings
              </li>
              <li class="py-1 px-2 hover:bg-hover3 cursor-pointer" @click="signOut()">Sign Out</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="pt-16">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Credentials } from '@/types'
import { list } from 'postcss'
import { resetAllStores } from './stores/resetAllStores'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/loggedin'
import { useDeckStore } from '@/stores/yourDeck'
import { useAnimationStore } from './stores/animation'

const animationStore = useAnimationStore()
const deckStore = useDeckStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const router = useRouter()
const isDropdownOpen = ref(false)
const listener = ref(false)
const createdDeckID = ref('')

function toggleDropdown() {
  if (listener.value === false) {
    isDropdownOpen.value = !isDropdownOpen.value
    let timeout
    timeout = setTimeout(listenerOn, 1)
  } else if (listener.value === true) {
    isDropdownOpen.value = true
  }
}

function listenerOn() {
  listener.value = !listener.value
}

function listenerOff() {
  listener.value = false
  isDropdownOpen.value = false
}

const verified = ref(false)

async function signOut() {
  // Use the user store here
  console.log(verified.value)
  const { error } = await supabase.auth.signOut()
  /*   console.log(error, verified.value) */
  router.push('/')
  settingsStore.pfp = ""
  settingsStore.currentTheme = 'default'
  verified.value = false
  userStore.loggedIn = false
  userStore.notLogged = true
  resetAllStores()
  localStorage.clear()
  sessionStorage.clear()
  userStore.logout()
}

async function addToUserTable(uid: string, email: string) {
  const { data: profileData, error: profileError } = await supabase.from('credentials').upsert([
    {
      uid: uid,
      email: email,
    },
  ])

  if (profileError) {
    console.error('Error upserting into profiles:', profileError)
    return
  }
  /*   console.log('Upserted profile:', profileData) */
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  /*   console.log(event, session) */
  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    const identity = ref<Credentials[]>([
      { uid: `${session?.user.id}`, email: `${session?.user.email}` },
    ])
    addToUserTable(identity.value[0].uid, identity.value[0].email)
    tableCheckpoint(session!.user.id)
    getSettings(session!.user.id)
  } else if (event === 'SIGNED_OUT') {
    verified.value = false
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
})
async function tableCheckpoint(uid: string) {
  const { data, error } = await supabase.from('API_credentials').select().eq('uid', uid)
  if (data) {
    await getDeckID()
  } else {
    console.error('Error fetching API credentials:', error)
    return
  }

  if (!data || data.length === 0) {
    await generateDeckID()
    await addToApiTable(uid, createdDeckID.value)
  }
  /*   deckStore.yourDeckID = data[0].supabaseDeckID */
  await necessaryAPICalls(
    `https://deckofcardsapi.com/api/deck/${deckStore.yourDeckID}/draw/?count=52`,
  )
}

async function addToApiTable(uid: string, APIDeckID: string) {
  const { data: profileData, error: profileError } = await supabase.from('API_credentials').insert([
    {
      uid: uid,
      supabaseDeckID: APIDeckID,
    },
  ])

  if (profileError) {
    console.error('Error inserting into profiles:', profileError)
    return
  }
  deckStore.yourDeckID = APIDeckID
}

async function generateDeckID() {
  try {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/')
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`API error: ${res.status} - ${errorText}`)
    } else {
      const data = await res.json()
      console.log(data.deck_id)
      createdDeckID.value = data.deck_id
      return { createdDeckID }
    }
  } catch (error) {
    alert(error)
  }
}

async function getDeckID() {
  const { data, error } = await supabase.from('API_credentials').select()

  if (error) {
    console.log(error)
  }

  if (!data || data.length === 0) {
    console.log('No data found in API_credentials table.')
    return
  }
  /*   console.log(data[0].supabaseDeckID) */
  deckStore.yourDeckID = data[0].supabaseDeckID
}

async function getSettings(uid: string) {
  const { data: existingSettings } = await supabase.from('user_settings').select('*').eq('uid', uid)

  if (!existingSettings || existingSettings.length === 0) {
    const { error: insertError } = await supabase.from('user_settings').insert([
      {
        uid: uid,
        theme: 'default',
        bubbles: false,
        pfp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png',
      },
    ])
  } else if (settingsStore.pfp === existingSettings[0].pfp) {
    settingsStore.pfp = existingSettings[0].pfp
    settingsStore.bubbles = existingSettings[0].bubbles
    animationStore.animation = false
    settingsStore.currentTheme = existingSettings[0].theme
    verified.value = true
    return existingSettings[0]
  } else {
    setTimeout(() => {
      settingsStore.pfp = existingSettings[0].pfp
      settingsStore.bubbles = existingSettings[0].bubbles
      animationStore.animation = false
      settingsStore.currentTheme = existingSettings[0].theme
      verified.value = true
      return existingSettings[0]
    }, 11000)
  }
}

async function necessaryAPICalls(link: string) {
  try {
    const res = await fetch(link)
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`APIfrgegrthtyh error: ${res.status} - ${errorText}`)
    } else {
      const data = await res.json()
      return data
    }
  } catch (error) {
    alert(error)
  }
}
</script>

<style scoped></style>
