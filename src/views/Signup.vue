<template>
  <form @submit.prevent="signup">
    <input v-model="username" placeholder="Username" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <input v-model="passwordConfirm" type="password" placeholder="Confirm Password" required />
    <button type="submit">Signup</button>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from '../axios'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')
const error = ref<string>('')
const router = useRouter()

const signup = async () => {
  try {
    await axios.post('/signup', {
      username: username.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    })
    router.push('/login')
  } catch (err: any) {
    error.value = err.response?.data.message || 'Signup failed'
  }
}
</script>