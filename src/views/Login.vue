<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h2 class="mb-4 text-center text-primary">Login</h2>
        <form @submit.prevent="login">
          <input v-model="username"
          class="form-control mb-3" placeholder="Username" required />
    <input v-model="password" class="form-control mb-3" type="password" placeholder="Password" required />
    <button type="submit" class="btn btn-success w-100">Login</button>
    <Loading v-if="loading" />
    <div v-if="error" class="mt-3 text-danger text-center">
      {{ error }}
    </div>
        </form>
        <router-link to="/signup" class="btn btn-link mt-3 w-100"
        style="text-decoration: none;">
          Sign Up
        </router-link>
      </div>
    </div>  
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from '../axios'
import { useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'

const store = useStore()
const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data } = await axios.post('/login', {
      username: username.value,
      password: password.value
    })
    store.commit('setAuth', { token: data.access_token, username: username.value })
    router.push('/tasks')
  } catch (err: any) {
    error.value = err.response?.data.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
const goToSignup = () => {
  router.push('/signup')
}

</script>