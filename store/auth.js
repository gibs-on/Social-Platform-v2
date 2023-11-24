import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    posts: [],
  }),

  actions: {
    async login(usernameOrEmail, password) {
      try {
        const apiEndpoint = 'https://jsonplaceholder.typicode.com/users'

        const response = await axios.post(apiEndpoint)

        response.data.array.forEach((user) => {
          if (user.email === usernameOrEmail && user.address.zipcode === password.value)
            this.isAuthenticated = true
          else if (user.username === usernameOrEmail.value && user.address.zipcode === password.value)
            this.isAuthenticated = true
          else
            this.isAuthenticated = false
        })
      }
      catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    async generateLogo() {
      return axios.get('[<https://api.unsplash.com/photos/random>](<https://api.unsplash.com/photos/random>)', {
        params: { query: this.keywords, client_id: '' },
      }).then((response) => { this.image = response.data.urls.regular })
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    createLimitedAndRandomizedList(originalList, limit) {
      const shuffledList = this.shuffleArray([...originalList])
      return shuffledList.slice(0, limit)
    },
  },

  getters: {
    getPostById: (postId) => {
      return state.posts.find(post => post.id === postId)
    },
  },

  mutations: {
    SET_POSTS(posts) {
      this.posts = posts
    },
  },

})
