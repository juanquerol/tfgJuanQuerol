
<template>
    <div class="log">
      <form @submit.prevent="login">
        <!-- Campos de inicio de sesión (por ejemplo, nombre de usuario y contraseña) -->
        <input v-model="email" placeholder="Nombre de usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <a href="/contraseña-olvidada">¿Olvidaste tu contraseña?</a>
        <a @click="goToAbout">¿No tienes una cuenta?</a>
        <button type="submit">Iniciar sesión</button>
        <button @click="loginWithGoogle">Iniciar sesión con Google</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { loginUser } from '@/main';

    const router = useRouter();
  
    function goToAbout() {
      router.push('/register');
    }
    


const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await loginUser(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}
  
  
  
  
  
  </script>
  
  <style scoped>
  .log {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 30vw;
    background-color: rgb(168, 155, 155);
    border-radius: 10px;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  }
  
  form {
    flex: 2 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -10px;
    justify-content: space-around;
    gap: 10px;
    width: 100%;
    height: 100%;
  }
  
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
  
  input:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px #007BFF;
  }
  
  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  a {
    color: #007BFF;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }
  
  a:hover {
    text-decoration: underline;
    color: #0056b3;
  }
  </style>