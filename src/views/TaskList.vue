<template>
  <div class="container py-5">
    <div class="card shadow mx-auto" style="max-width: 540px;">
      <div class="card-body">
        <button @click="logout" class="btn btn-outline-danger btn-sm float-end">Logout</button>
    <h2 class="mb-4 text-primary">Tasks for {{ store.getters.username }}</h2>
    <TaskForm @added="fetchTasks" />
    <ul class="list-group mt-4">
      <li v-for="task in tasks" :key="task._id"
      class="list-group-item d-flex align-items-center justify-content-between"
            :class="{'list-group-item-success': task.completed}">
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <span v-if="task.completed"  class="badge bg-success ms-2">[Done]</span>
      </li>
    </ul>
      </div>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TaskForm from '../components/TaskForm.vue'

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const tasks = ref<Task[]>([])
const store = useStore()
const router = useRouter()

const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/tasks')
    tasks.value = data
  } catch (err: any) {
    if (err.response?.status === 401) router.push('/login')
  }
}

const logout = () => {
  store.commit('logout')
  router.push('/login')
}

onMounted(fetchTasks)
</script>