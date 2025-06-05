import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import TaskList from '../views/TaskList.vue'

const routes= [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/tasks', component: TaskList },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router