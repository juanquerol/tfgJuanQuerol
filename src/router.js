import { createWebHistory, createRouter } from 'vue-router'


import Login from './pages/UserLogin.vue'
import Register from './pages/UserRegister.vue'
import Dashboard from './pages/UserDashboard.vue'


const routes = [
  {
     path: '/',
     name: 'Login',
      component: Login 
    },
  { 
    path: '/register',
    name: 'Register',
    component: Register 
  },
  {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard 
    },

  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router