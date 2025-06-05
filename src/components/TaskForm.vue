<template>
  <form @submit.prevent="addTask" class="card shadow p-3 mb-4 bg-white rounded" style="max-width: 400px; margin: 0 auto;">
    <div class="mb-3">
      <input v-model="title" class="form-control" placeholder="Task Title" required />
    </div>
    <button type="submit" class="btn btn-primary w-100">Add Task</button>
    <div v-if="error" class="mt-2 text-danger text-center">{{ error }}</div>
  </form>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import axios from '../axios'

const title = ref<string>('')
const error = ref<string>('')
const emit = defineEmits(['added'])

const addTask = async () => {
  try {
    await axios.post('/tasks', { title: title.value })
    title.value = ''
    emit('added')
  } catch (err: any) {
    error.value = err.response?.data.message || 'Failed to add task'
  }
}
</script>