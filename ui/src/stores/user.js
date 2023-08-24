import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ token: '', user: {} }),
  getters: {
    isLogin(state) {
      return state.token !== ''
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'brandful-my-user',
        storage: localStorage,
        paths: ['token', 'user']
      }
    ]
  }
})
