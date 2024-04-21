import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './pages/UserLogin.vue'
import Register from './pages/UserRegister.vue'
import Dashboard from './pages/UserDashboard.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },

  

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router