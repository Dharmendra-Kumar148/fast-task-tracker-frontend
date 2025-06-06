<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4 text-center text-primary">Sign Up</h2>
      <form @submit.prevent="signup" style="display:flex; flex-direction:column; gap:16px; padding:32px; background:white; border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,0.08); min-width:300px;">
    <input v-model="username" class="form-control mb-3" placeholder="Username" required />
    <input v-model="password" class="form-control mb-3" type="password" placeholder="Password" required />
    <input v-model="passwordConfirm" class="form-control mb-3" type="password" placeholder="Confirm Password" required />
    <button type="submit"  class="btn btn-success w-100">Signup</button>
    <Loading v-if="loading" />
    <div v-if="error" class="mt-3 text-danger text-center">{{ error }}</div>
  </form>
  <router-link to="/login" class="btn btn-link mt-3 w-100"
        style="text-decoration: none;">
          Back
        </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from '../axios'
import { useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'

const username = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')
const error = ref<string>('')
const router = useRouter()
const loading = ref(false)

const signup = async () => {
  loading.value = true
  error.value = ''
  try {
    await axios.post('/signup', {
      username: username.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    })
    router.push('/login')
  } catch (err: any) {
    error.value = err.response?.data.message || 'Signup failed'
  } finally {
    loading.value = false
  }
}
</script>