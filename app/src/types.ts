export interface Credentials {
  email: string
  uid: string
}
export interface Instruments {
  name: string
  id: number
}

export interface CheckLogin { // Try this with the state
  loggedIn: boolean
}