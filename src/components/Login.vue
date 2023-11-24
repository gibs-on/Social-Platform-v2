<!-- src/components/Login.vue -->
<script setup>
import { ref } from 'vue'

const usernameOrEmail = ref('')
const password = ref('')
const loginError = ref('')

function login() {
  // Simulate login logic
  const user = users.find(
    u => (u.username === usernameOrEmail.value || u.email === usernameOrEmail.value) && u.address.zipcode === password.value,
  )

  if (user) {
    // Successful login
    loginError.value = ''
    console.log('Login successful')
  }
  else {
    // Failed login
    loginError.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="usernameOrEmail">Username or Email:</label>
      <input id="usernameOrEmail" v-model="usernameOrEmail" type="text" required>

      <label for="password">Zip Code:</label>
      <input id="password" v-model="password" type="password" required>

      <button type="submit">
        Login
      </button>
    </form>

    <div v-if="loginError" class="error-message">
      {{ loginError }}
    </div>
  </div>
</template>

<style scoped>
  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
