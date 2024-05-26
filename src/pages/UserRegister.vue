
<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addUser, registerUser,uploadImage } from '@/main.js';
//import { inject } from 'vue';


export default {
  setup() {
    
    const router = useRouter();
    //reader para leer la imagen
// let fileInput = ref(null)
    const user = ref(
      {
        Email: '',
        Password: '',
        Nombre: '',
        Birthdate: '',
        Ciudad: '',
        Pais: '',
        FotoPerfilURL: '' // Nuevo campo para la URL de la foto de perfil
      }
        

    )
    
    
    const rptpassword = ref('')

    const loginChange = () => {
      router.push('/');
      
    }


    //seleccionar una foto de perfil del dispositivo
    const selectImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    user.value.FotoPerfilURL = file;
    console.log(user.value.FotoPerfilURL);
  }
}
      
    


    const submitRegister = () => {

      if (user.value.Password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres')
        return
      }
      if (user.value.Password !== rptpassword.value) {
        alert('Las contraseñas no coinciden')
        return
      }
      register()
    }
    //subir foto de perfil
    
    
      
    

    const register = async () => {
  try {
    await registerUser(user.value.Email, user.value.Password)
    user.value.FotoPerfilURL = await uploadImage( user.value.FotoPerfilURL)
    await addUser(user.value )
    router.push('/dashboard')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Ya existe una cuenta con ese correo electrónico')
    } else {
      console.log(error)
    }
  }
}

    return {
     
      rptpassword,
      user,
      loginChange,
      submitRegister,
      register,
      selectImage
      
    }
  }
}
</script>
<template>
    <section class="hero is-fullheight has-background-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <form @submit.prevent="submitRegister">
              <h3 class="title has-text-dark">Registrarse</h3>
              <!-- foro de perfil -->
              <div class="field">
    <div class="control has-icons-left">
      <input class="input is-large" type="file"  @change="selectImage($event)" placeholder="Foto de perfil">
      <span class="icon is-small is-left">
        <i class="fas fa-image"></i>
      </span>
    </div>
  </div>
              <!-- nombre -->
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="text" v-model="user.Nombre" placeholder="Nombre de usuario">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="email" v-model="user.Email" placeholder="Correo electrónico" autocomplete="username">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="password" v-model="user.Password" placeholder="Contraseña" autocomplete="current-password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="password" v-model="rptpassword" placeholder="Repetir Contraseña" autocomplete="current-password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="date" v-model="user.Birthdate" placeholder="Fecha de Cumpleaños">
                  <span class="icon is-small is-left">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="text" v-model="user.Pais" placeholder="País">
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="text" v-model="user.Ciudad" placeholder="Ciudad">
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </div>
              </div>
              <button class="button is-block is-light is-large is-fullwidth">Registrarse</button>
            </form>
            <p class="has-text-grey">
              <a @click="loginChange()">Ya tengo una cuenta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>

<style scoped>
body {
  background-color: #f5f5f5;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  
}
.hero.is-fullheight {
  
  min-height: 100vh;
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