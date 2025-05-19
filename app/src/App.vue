<template>
  <div
    :data-theme="themeStore.currentTheme"
    class="min-h-screen bg-1"
    @click="listener && listenerOff()"
  >
    <header>
      <nav class="bg-2 h-16 p-2 flex justify-between items-center">
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
            class="py-2 px-4 ml-2 rounded-full bg-gray-500 flex items-center justify-center text-textcolor text-xl font-bold cursor-pointer"
            @click="toggleDropdown()"
            v-if="verified"
          >
            A
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
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Credentials } from '@/types'
import { list } from 'postcss'
import { useThemeStore } from '@/stores/chooseTheme'
import { useUserStore } from '@/stores/loggedin'

const themeStore = useThemeStore()
const userStore = useUserStore()

const router = useRouter()
const isDropdownOpen = ref(false)
const listener = ref(false)

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
  console.log(error, verified.value)
  router.push('/')
  userStore.logout()
}

async function addtoTable(uid: string, email: string) {
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
  console.log('Upserted profile:', profileData)
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    verified.value = true
    const identity = ref<Credentials[]>([
      { uid: `${session?.user.id}`, email: `${session?.user.email}` },
    ])
    addtoTable(identity.value[0].uid, identity.value[0].email)
  } else if (event === 'SIGNED_OUT') {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/')
    verified.value = false
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
})
</script>

<style scoped></style>
