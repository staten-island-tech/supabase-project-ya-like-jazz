import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Credentials } from "../types.ts"

// export const useUserStore = defineStore('user', {
//     state: (): Credentials => {
       
//     }
// })

// State - We want to check if a user is logged in so they don't have to log in over and over every time they go to a different webpage
// Use verified (app.vue) to verify logged-in status

