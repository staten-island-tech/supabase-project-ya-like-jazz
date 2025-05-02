import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface State { // You can define the state for Pinia as an interface with Typescript 
    userList: Credential[]
    user: Credential | null
}

export const userStore = defineStore('user', {
    state: (): State => {
        return {
            userList: [],
            user: null,
        }
    }
})
