import { createWebHistory, createRouter } from 'vue-router'


import Login from './pages/UserLogin.vue'
import Register from './pages/UserRegister.vue'
import Dashboard from './pages/UserDashboard.vue'
import MyIdeas from './pages/UserIdea.vue'
import UserPerfil from './pages/UserPerfil.vue'
import UserForget from './pages/UserForget.vue'


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
    {
      path: '/myideas',
      name:'MyIdeas',
      component: MyIdeas
    },
    {
      path: '/perfil',
      name:'perfil',
      component: UserPerfil
    },
    {
      path: '/forgetpassword',
      name:'ForgetPassword',
      component: UserForget

    }

  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router