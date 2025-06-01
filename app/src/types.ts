export interface Credentials {
  email: string
  uid: string
}
export interface Instruments {
  name: string
  id: number
}

export interface CheckLogin {
  // Try this with the state
  loggedIn: boolean
}

export interface CardCollection {
  code: string
  image: string
  suit: string
  value: number
}

export type Suits = 'Diamonds' | 'Clubs' | 'Hearts' | 'Spades' 
export type Numbers = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King' | 'Ace'
