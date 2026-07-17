import { defineStore } from 'pinia'


interface AuthState {
  // user: User | null
  token: string | null
  loading: boolean
}
