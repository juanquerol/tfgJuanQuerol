<template>
    <div class="user-dashboard" v-bind:class="{ 'dark-mode': isDarkMode }">
      
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      
      
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Buscar" v-model="searchValue">
            </div>
          </div>
        </div>
        <button class="button is-primary is-small is-rounded" @click="showForm = true">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Crear idea</span>
        </button>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleBurger">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      

      <div class="navbar-end">
        <router-link class="navbar-item" to="/dashboard">Inicio</router-link>
        <router-link class="navbar-item" to="/amigos">Amigos</router-link>
        <router-link class="navbar-item" to="/populares">Populares</router-link>
        <router-link class="navbar-item" to="/MyIdeas">Mis Ideas</router-link>
        
        <div class="navbar-item">
          <div class="profile-container">
            <!-- Foto de perfil -->
            <div class="profile-image-container" v-if="FotoPerfil || FotoPerfil>=1">
              <img class="profile-image" :src="FotoPerfil" alt="Foto de perfil">
            </div>
            <!-- si no tiene foto utilizara un fondo de un color aleatorio y con su letra inicial de su nombre -->
            <div class="profile-image-container" v-else :style="{ backgroundColor: randomColor() }">
              <p class="title is-1 has-text-white has-text-centered">{{ nombreUsuario1.substring(0, 2) }}</p>
            </div>
            <!-- Nombre de usuario -->
            <a class="username" @click="changePerfil">{{ nombreUsuario1 }}</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getIdeas, getMyIdeas, getOtraPersonaByEmail } from '@/main';


export default {
  setup() {
    const userLocal = ref(JSON.parse(localStorage.getItem('user')));
    const searchValue = ref('');
    const showForm = ref(false);
    const isDarkMode = ref(false);
    const isActive = ref(false);
    const usuario = ref(null)
    const toggleBurger = () => {
      isActive.value = !isActive.value;
    };
    const changePerfil = () => {
      router.push('/perfil');
    };
    onMounted(async () => {
      if (showForm.value ==false) {
  const data = await getIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data
    
}
      usuario.value = await getOtraPersonaByEmail(userLocal.value.email)
      console.log(usuario.value)
      
      FotoPerfil.value = usuario.value.FotoPerfilURL

      nombreUsuario.value = usuario.value.Nombre
      const data = await getMyIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data

    })
    return {
      searchValue,
      showForm,
      isDarkMode,
      isActive,
      toggleBurger,
      changePerfil
    };
  }
};
</script>