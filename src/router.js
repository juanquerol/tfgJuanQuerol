import { createWebHistory, createRouter } from 'vue-router'


import Login from './pages/UserLogin.vue'
import Register from './pages/UserRegister.vue'
import Dashboard from './pages/UserDashboard.vue'
import MyIdeas from './pages/UserIdea.vue'
import UserPerfil from './pages/UserPerfil.vue'
import UserForget from './pages/UserForget.vue'
import UserPage from './pages/UserPage.vue'
import UserAmigos from './pages/UserAmigos.vue'
import UserChat from './pages/UserChat.vue'
import PagePopular from './pages/PagePopular.vue'
import PageNovedad from './pages/PageNovedad.vue'


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

    },
    {
      path: '/user-page/:email',
      name:'UserPage',
      component: UserPage

    },
    {
      path: '/amigos',
      name:'Amigos',
      component: UserAmigos

    },
    {
      path: '/chat',
      name:'Chat',
      component: UserChat

    },
    {
      path: '/popular',
      name:'Popular',
      component: PagePopular

    },
    {
      path: '/novedad',
      name:'Novedad',
      component: PageNovedad

    },


  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router