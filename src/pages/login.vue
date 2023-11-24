<!-- src/components/Login.vue -->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

const authStore = useAuthStore()
const router = useRouter()

const { isAuthenticated, users } = storeToRefs(authStore)

const usernameOrEmail = ref('')
const password = ref('')
const loginError = ref('')

watch((isAuthenticated) => {
  if (isAuthenticated.value)
    router.push('/')
})

function showPlans() {
    router.push('/plans')
}

onMounted(() => {
  authStore.fetchUsers()
})

function login() {
  // Simulate login logic
  authStore.login(usernameOrEmail.value, password.value)
  let user = null
  if (users.value.length > 0) {
    users.value.forEach((element) => {
      if (element.username === usernameOrEmail.value && element.address.zipcode === password.value || element.email === usernameOrEmail.value && element.address.zipcode === password.value)
        user = element
    })
  }

  if (user) {
    // Successful login
    loginError.value = ''
    console.log('Login successful')
    router.push('/')
  }
  else {
    // Failed login
    loginError.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="h-[100vh]">
    <div class="mt-[10%]">
      <h2 class="p-3 font-semibold">
        Welcome to this Social Platform
      </h2>
      <h2 class="p-1 text-sm font-normal">
        enter your credentials to login
      </h2>
      <div class="m-auto w-[20%] b p-5">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <!-- <label for="usernameOrEmail">Username or Email:</label> -->
            <input
              id="usernameOrEmail" v-model="usernameOrEmail" class="b p-1 px-3" type="text" placeholder="email"
              required
            >
          </div>
          <div class="mb-3">
            <!-- <label for="password">Zip Code:</label> -->
            <input id="password" v-model="password" class="b p-1 px-3" type="password" placeholder="*****" required>
          </div>

          <button type="submit" class="rounded-sm bg-blue-300 px-6 py-2">
            Login
          </button>
        </form>

        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
