export const useUserStore = defineStore('users', {
  persist: {
    storage: persistedState.localStorage
  },

  state: () => ({
    items: [
      {
        id: 1,
        username: 'john',
        email: 'john@example.com',
        phone: '+1 555 123456',
        timestamp: '2021-09-01 12:00:00',
        password: '123456'
      }
    ]
  }),

  getters: {
    getUsers() {
      return this.items
    }
  },

  actions: {
    addUser(user) {
      const date = new Date()

      this.items.push({
        ...user,
        id: this.items.length ? this.items[this.items.length - 1].id + 1 : 1,
        timestamp: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      })
    }
  }
})
