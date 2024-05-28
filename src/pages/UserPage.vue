<template>
    <div class="user-dashboard" v-bind:class="{ 'dark-mode': isDarkMode }">
      
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/dashboard">Inicio</router-link>
          <router-link class="navbar-item" to="/amigos">Amigos</router-link>
          <router-link class="navbar-item" to="/populares">Populares</router-link>
          <router-link class="navbar-item" to="/MyIdeas">Mis Ideas</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            
          </div>
          <div class="navbar-item">
            <div class="profile-container">
      <!-- Foto de perfil -->
      <div class="profile-image-container" v-if="fotoPerfil || fotoPerfil>=1">
        <img class="profile-image" :src="fotoPerfil" alt="Foto de perfil">
      </div>
      <!-- si no tiene foto utilizara un fondo de un color aleatorio y con su letra inicial de su nombre -->
      <div class="profile-image-container" v-else :style="{ backgroundColor: randomColor() }">
    <p class="title is-1 has-text-white has-text-centered">{{ nombreUsuario1 && nombreUsuario1.substring(0, 2)}}</p>
  </div>
      <!-- Nombre de usuario -->
      <router-link class="username" to="/perfil">{{ nombreUsuario1 }}</router-link>
    </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
<!-- informacion de la persona a la derecha de pantalla con estilos de bulma-->
<div class="columns">
  <div class="column is-3">
    
<div class="card persona">
    <div class="card-image persona">
        <figure class="image is-4by3" v-if="otraPersona.FotoPerfilURL && otraPersona.FotoPerfilURL.length>=1">
        <img :src="otraPersona.FotoPerfilURL" alt="Foto de perfil">
        </figure>
        <div class="image is-4by3" v-else :style="{ backgroundColor: randomColor() }">
    <p class="title is-1 has-text-white has-text-centered">{{otraPersona.FotoPerfilURL && otraPersona.Nombre.substring(0, 2)}}</p>
  </div>
    </div>
    <div class="card-content persona">
        <div class="media">
        <div class="media-content">
            <p class="title is-4">{{ otraPersona.Nombre }}</p>
            <p class="subtitle is-6">{{ otraPersona.Email }}</p>
        </div>
        </div>

        <div class="content">
        
        <p>Ciudad: {{ otraPersona.Ciudad }}</p>
        <p>País: {{ otraPersona.Pais }}</p>
        
        </div>
    </div>
</div>


    </div>
</div>
    
    
    
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
//router
import { useRoute } from 'vue-router';

import { getOtraPersonaByemail, getPersonIdeas, getPersonaByEmail, getNombreByEmail } from '@/main.js';
export default {
    name: 'UserPage',
   
  setup() {
    const route = useRoute()
    
    
    const nombreUsuario1 = ref('')
    const fotoPerfil = ref('')
    const otraPersona = ref([])
    const personIdeas = ref([])
    const persona = ref([])
    const randomColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return `#${randomColor}`;
};
    onMounted(async () => {
        nombreUsuario1.value = await getNombreByEmail()
       persona.value = await getPersonaByEmail()
      fotoPerfil.value = persona.value.FotoPerfilURL
      
        otraPersona.value = await getOtraPersonaByemail(route.params.email);
        personIdeas.value = await getPersonIdeas(route.params.email);
       
      

    })
    
    return {
        route,
      isDarkMode: false,
        nombreUsuario1,
        fotoPerfil,
        
        
        otraPersona,
        personIdeas,
        randomColor,
        persona,


    }
  },
  
}




</script>
<style scoped>
  .navbar {
  background-color: #363636;
  color: #fff;
  padding: 1rem;
}

.navbar-item {
  color: #fff;
}

.navbar-item:hover {
  color: #00d1b2;
}

/* Estilos para las tarjetas de ideas */
.card {
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
}

.card-content {
  padding: 1rem;
}

/* Estilos para los botones */
.button {
  border-radius: 5px;
  font-weight: bold;
}

.button.is-info {
  background-color: #00d1b2;
}

.button.is-info:hover {
  background-color: #00b89c;
}

.button.is-primary {
  background-color: #3273dc;
}

.button.is-primary:hover {
  background-color: #276cda;
}

.button.is-danger {
  background-color: #ff3860;
}

.button.is-danger:hover {
  background-color: #e61e4d;
}
.comentarios {
  height: 20rem;
  overflow: scroll;
}
/* Estilos para los comentarios */
.comment-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-username {
  font-weight: bold;
  color: #333;
  margin-left: 10px; /* Espacio entre la foto de perfil y el nombre de usuario */
}

.comment-content {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.4;
}

.comment-time {
  font-size: 12px;
  color: #999;
  margin-top: 0px;
  align-self: flex-start; /* Coloca la fecha en la esquina superior derecha */
}

.comment-likes {
  position: absolute;
  bottom: 5px; /* Alinea los likes en la esquina inferior */
  right: 5px; /* Alinea los likes en la esquina derecha */
}

.like-button {
  display: flex;
  align-items: center;
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
}
/* Estilos para el contenedor de la foto de perfil y el nombre de usuario */
.profile-container {
  display: flex;
  align-items: center;
}

.profile-image-container {
  width: 40px; /* Ajusta el tamaño de la foto de perfil según sea necesario */
  height: 40px; /* Ajusta el tamaño de la foto de perfil según sea necesario */
  overflow: hidden;
  border-radius: 50%; /* Recorta la foto de perfil en forma redonda */
  margin-right: 10px; /* Ajusta el espacio entre la foto de perfil y el nombre de usuario */
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 14px;
}
.card.persona{
  max-width: 300px;
  margin: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-image.persona img {
  object-fit: cover;
}

.card-content.persona {
  padding: 1.5rem;
}
.dark-mode {
    background-color: #333;
    color: #fff;
}

.dark-mode button {
    background-color: #444;
    color: #fff;
}

.dark-mode .card {
    background-color: #444;
    color: #fff;
}

/* estilos de los detalles de una persona */
.card.persona {
    max-width: 300px;
    margin: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-image.persona img {
    object-fit: cover;
}

.card-content.persona {
    padding: 1.5rem;
}



  </style>