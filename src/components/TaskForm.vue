<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="Task Title" required />
    <button type="submit">Add Task</button>
    <div v-if="error" style="color: red;">{{ error }}</div>
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