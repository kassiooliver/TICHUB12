import { defineStore } from "pinia"
import { Role } from "../enums/Role"
import { User } from "../models/User"

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  username: string
  email: string
  password: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true

      return new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (payload.email === "admin@email.com" && payload.password === "123456") {
            this.user = new User(1, "admin", payload.email, Role.ADMIN)
            this.token = "fake-admin-token"
            this.loading = false
            resolve(this.user)
            return
          }

          if (payload.email === "cliente@email.com" && payload.password === "123456") {
            this.user = new User(2, "cliente", payload.email, Role.CUSTOMER)
            this.token = "fake-customer-token"
            this.loading = false
            resolve(this.user)
            return
          }

          this.loading = false
          reject(new Error("Credenciais inválidas"))
        }, 1200)
      })
    },

    async register(payload: RegisterPayload) {
      this.loading = true

      return new Promise<User>((resolve) => {
        setTimeout(() => {
          this.user = new User(
            Date.now(),
            payload.username,
            payload.email,
            Role.CUSTOMER
          )
          this.token = "fake-register-token"
          this.loading = false
          resolve(this.user!)
        }, 1200)
      })
    },

    logout() {
      this.user = null
      this.token = null
      this.loading = false
    }
  }
})
