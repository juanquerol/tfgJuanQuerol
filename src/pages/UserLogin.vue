
<template>
     <section class="hero is-fullheight has-background-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          
          <div class="box">
      <form @submit.prevent="login">
        <h3 class="title has-text-dark">Iniciar sesión</h3>
        <div class="field has-icons-left">
          <div class="control has-icons-left">
            <input class="input is-large" type="email" v-model="email" placeholder="Correo electrónico" autofocus="">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div class="field has-icons-left">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" v-model="password" placeholder="Contraseña">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button class="button is-block is-light is-large is-fullwidth">Iniciar sesión</button>
      </form>
      <p class="has-text-grey">
            <a @click="goToAbout()">Registrarse</a> &nbsp;·&nbsp;
            <a href="/forgetpassword">¿Olvidaste tu contraseña?</a>
          </p>
    </div>
          
        </div>
      </div>
    </div>
  </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  import { loginUser } from '@/main';
  import { useRouter } from 'vue-router';
  

const router = useRouter();

function goToAbout() {
  router.push('/register');
}
    


const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await loginUser(email.value, password.value)
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      // Si hay datos de sesión, los carga en el estado de la aplicación
      this.$store.commit('SET_SESSION_DATA', JSON.parse(sessionData));
    }
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}
  
  
  
  
  
  </script>
  
  <style scoped>
  .hero.is-fullheight {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random') no-repeat center center fixed; 
    background-size: cover;
  }

  .title {
    margin-bottom: 2rem;
  }

  .box {
    margin-top: 2rem;
    background-color: rgba(207, 207, 207, 0.9);
    opacity: 0.9;
  }

  .button.is-light {
    background-color: #fff;
    color: #00d1b2;
    border-color: transparent;
    box-shadow: none;
  }

  .button.is-light:hover {
    background-color: #00d1b2;
    color: #fff;
  }
  </style>