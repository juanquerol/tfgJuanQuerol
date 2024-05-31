<template>
    <section class="hero is-fullheight has-background-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <form @submit.prevent="resetPassword">
                <h3 class="title has-text-dark">Restablecer contraseña</h3>
                <div class="field has-icons-left">
                  <div class="control has-icons-left">
                    <input class="input is-medium" type="email" v-model="email" placeholder="Correo electrónico" autofocus="">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <button class="button is-block is-light is-medium is-fullwidth">Restablecer contraseña</button>
              </form>
              <p class="has-text-grey">
                <a @click="goToLogin()">Iniciar sesión</a> &nbsp;·&nbsp;
                <a @click="goToRegister()">Registrarse</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { forgetPassword } from '@/main';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goToLogin() {
    router.push('/');
  }
  
  function goToRegister() {
    router.push('/register');
  }
  
  const email = ref('')
  
  const resetPassword = async () => {
    try {
      await forgetPassword(email.value)
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  </script>
  <style scoped>
    .hero.is-fullheight {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/FotoBombillas.png') no-repeat center center fixed; 
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