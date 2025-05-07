import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CheckLogin } from "../types.ts"

export const useUserStore = defineStore('user', {
    state: (): CheckLogin => {
        return {
            loggedIn: false
        }

    },
    actions: {
        // We rely on "this"; no arrow functions
        login() {
            this.loggedIn = true
        }
    }
})