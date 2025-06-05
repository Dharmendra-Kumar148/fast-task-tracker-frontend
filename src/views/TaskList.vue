<template>
  <div>
    <button @click="logout" style="float: right;">Logout</button>
    <h2>Tasks for {{ store.getters.username }}</h2>
    <TaskForm @added="fetchTasks" />
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <span v-if="task.completed" style="color: green;">[Done]</span>
      </li>
    </ul>
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