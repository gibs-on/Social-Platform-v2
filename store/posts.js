import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('posts', {
  state: () => ({
    id: Number,
    post: {},
    posts: [],
  }),

  actions: {
    async fetchPosts() {
      try {
        const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts'
        const config = {
          params: {},
        }

        const response = await axios.get(apiEndpoint, config)
        this.posts = this.createLimitedAndRandomizedList(response.data, 20)
      }
      catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    setSelectedPostId(post) {
      this.id = post.id
      this.post = post
    },
    async fetchPostById() {
      try {
        const apiEndpoint = `https://jsonplaceholder.typicode.com/posts/${this.id}`
        const response = await axios.get(apiEndpoint)
        this.post = response.data
      }
      catch (error) {
        console.error('Error fetching post:', error)
      }
    },
    async generateCover() {
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
      // const shuffledList = this.shuffleArray([...originalList])
      // return shuffledList.slice(0, limit)
      return originalList.slice(0, limit)
    },
  },

  getters: {
    /* getPostById: (postId) => {
      return this.posts.find(post => post.id === postId)
    }, */
  },

  mutations: {
    SET_POSTS(posts) {
      this.posts = posts
    },
  },

})
