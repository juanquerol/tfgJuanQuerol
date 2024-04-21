
<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { registerUser } from '@/main.js';
//import { inject } from 'vue';


export default {
  setup() {
    
    const router = useRouter();
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const rptpassword = ref('')

    const loginChange = () => {
      router.push('/');
    }

    const submitRegister = () => {
      if (password.value !== rptpassword.value) {
        alert('Las contraseñas no coinciden')
        return
      }
      register()
    }

    const register = async () => {
      try {
        await registerUser(email.value, password.value)
        router.push('/dashboard')
        
      } catch (error) {
        console.log(error)
      }
    }

    return {
      email,
      password,
      username,
      rptpassword,
      loginChange,
      submitRegister,
      register
    }
  }
}
</script>
<template>
    <form @submit.prevent="submitRegister()">
      <input v-model="username" placeholder="Nombre de usuario" />
      <input v-model="email" placeholder="Correo electronico" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <input v-model="rptpassword" type="password" placeholder="Repetir Contraseña" />
      <a @click="loginChange()">Ya tengo una cuenta</a>
      <button type="submit" @click="submitRegister()">Registrase</button>
    </form>
  </template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>