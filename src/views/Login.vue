<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Username" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </form>
   <!-- <button @click="goToSignup" style="margin-top: 10px;">
    Sign Up
  </button> -->
  <router-link to="/signup" style="margin-top: 10px; display: inline-block;">
  Sign Up
</router-link>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from '../axios'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const login = async () => {
  try {
    const { data } = await axios.post('/login', {
      username: username.value,
      password: password.value
    })
    store.commit('setAuth', { token: data.access_token, username: username.value })
    router.push('/tasks')
  } catch (err: any) {
    error.value = err.response?.data.message || 'Login failed'
  }
}
const goToSignup = () => {
  router.push('/signup')
}

</script>