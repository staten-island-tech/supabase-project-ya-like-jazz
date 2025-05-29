import { defineStore } from 'pinia'
import type { Credentials } from '../types.ts'

// interface UserInfo { // We already have Credentials
// Ok I understand you can remove it at any time
//   id: string;
//   name: string;
//   email: string;
// }

interface UserState {
  loggedIn: boolean
  userInfo?: Credentials
  accessToken?: string // would we need this???
  // i honestly don't understand pinia too much but if it never changes i dont see a need for it
  isLoading: boolean
  error?: string
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      loggedIn: false,
      userInfo: undefined,
      user: null as Credentials | null,
      accessToken: undefined,
      isLoading: false,
      error: undefined,
    }) as UserState,

  actions: {
    login(userInfo: Credentials, token: string) {
      this.loggedIn = true
      this.userInfo = userInfo
      this.accessToken = token
    },
    logout() {
      this.loggedIn = false
      this.userInfo = undefined
      this.accessToken = undefined
    },
    setLoading(status: boolean) {
      this.isLoading = status
    },
    setError(msg: string) {
      this.error = msg
    },
  },

  getters: {
    displayName: (state) => state.userInfo?.uid ?? 'Guest',
  },
})
