import { defineStore } from "pinia"
import { User } from "../models/User"

const API_URL = "http://localhost:3001"

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

function getStoredUser() {
  const user = localStorage.getItem("auth:user")
  return user ? JSON.parse(user) as User : null
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: getStoredUser(),
    token: localStorage.getItem("auth:token"),
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error("Credenciais invalidas")
        }

        const data = await response.json()
        this.user = new User(data.user.id, data.user.username, data.user.email, data.user.role)
        this.token = data.token
        localStorage.setItem("auth:user", JSON.stringify(this.user))
        localStorage.setItem("auth:token", this.token as string)

        return this.user
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload) {
      this.loading = true

      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          const error = await response.json().catch(() => null)
          throw new Error(error?.message ?? "Nao foi possivel criar a conta")
        }

        const data = await response.json()
        this.user = new User(data.user.id, data.user.username, data.user.email, data.user.role)
        this.token = data.token
        localStorage.setItem("auth:user", JSON.stringify(this.user))
        localStorage.setItem("auth:token", this.token as string)

        return this.user
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.loading = false
      localStorage.removeItem("auth:user")
      localStorage.removeItem("auth:token")
    }
  }
})
