<template>
  <div class="User">
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
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" placeholder="Buscar" v-model="searchValue">
              </div>
              <div class="control">
                <button class="button is-info">
                  Buscar
                </button>
              </div>
            </div>
          </div>
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
      <router-link class="username" to="/perfil">{{ nombreUsuario1 }}</router-link>
    </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title has-text-centered">Perfil de usuario</h1>

            <form v-if="showForm" @submit.prevent="updatePerfil">
              <div class="field">
    <div class="control has-icons-left">
      <input class="input is-large" type="file"  @change="selectImage($event)" placeholder="Foto de perfil">
      <span class="icon is-small is-left">
        <i class="fas fa-image"></i>
      </span>
    </div>
  </div>
          
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input" type="text" v-model="user.Nombre" placeholder="Nombre">
                </div>
              </div>

              

              <div class="field">
                <label class="label">Fecha de nacimiento</label>
                <div class="control">
                  <input class="input" type="date" v-model="user.Birthdate" placeholder="Fecha de nacimiento">
                </div>
              </div>

              
              <div class="field">
                <label class="label">Ciudad</label>
                <div class="control">
                  <input class="input" type="tel" v-model="user.Ciudad" placeholder="Ciudad">
                </div>
              </div>
              <div class="field">
                <label class="label">País</label>
                <div class="control">
                  <input class="input" type="tel" v-model="user.Pais" placeholder="">
                </div>
              </div>



              <!-- Agrega más campos aquí según sea necesario -->

              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth">Actualizar perfil</button>
                </div>
              </div>
              <div class="buttons">
            <button class="button is-danger" @click="logoutFunction">Logout</button>
            <button class="button is-primary" @click="showForm = false">cancelar</button>
          </div>
            </form>
            <div v-else>
              <div class="user-data">
                <p v-if="persona"><strong>Nombre:</strong> {{ persona.Nombre }}</p>
    <p v-if="persona"><strong>Fecha de nacimiento:</strong> {{ persona.Birthdate }}</p>
    <p v-if="persona"><strong>Ciudad:</strong> {{ persona.Ciudad }}</p>
    <p v-if="persona"><strong>País:</strong> {{ persona.Pais }}</p>
          </div>

          <!-- Botones de logout y editar perfil -->
          <div class="buttons">
            <button class="button is-danger" @click="logoutFunction">Logout</button>
            <button class="button is-primary" @click="showForm = true">Editar perfil</button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';
import { updateProfile, getOtraPersonaByEmail, logout} from '@/main';

export default {
  name: 'UserPerfil',
  setup() {
    const nombreUsuario1 = ref('');
    const userLocal = ref(JSON.parse(localStorage.getItem('user')));
    const router = useRouter();
    const persona = ref(null); // Cambiado a null para indicar que no se ha cargado aún
    const FotoPerfil = ref('');
    const showForm = ref(false);
    const isLoading = ref(true);
    const user = {
      Nombre: '',
      Birthdate: '',
      Ciudad: '',
      Pais: '',
      FotoPerfilURL: ''
    };

    const logoutFunction = async () => {
      localStorage.removeItem('user');
      await logout();
      router.push('/');
    };

    const randomColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    };

    const updatePerfil = async () => {
      try {
        await updateProfile(user);
        router.push('/dashboard');
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    };

    onMounted(async () => {
        
        //{uid: "7osx09zvluOLjbPSnYLmYk4fTA22", email: "perropeliculon@gmail.com", emailVerified: false,…}
        persona.value = await getOtraPersonaByEmail( userLocal.value.email);
        nombreUsuario1.value = persona.value.Nombre;
        if (persona.value) { // Comprueba si persona.value no es nulo
      FotoPerfil.value = persona.value.FotoPerfilURL;
      user.Nombre = persona.value.Nombre;
      user.Birthdate = persona.value.Birthdate;
      user.Ciudad = persona.value.Ciudad;
      user.Pais = persona.value.Pais;
    }
        isLoading.value = false; // Desactivar el estado de carga una vez que los datos se han cargado
      
    });

    return {
      user,
      updatePerfil,
      nombreUsuario1,
      showForm,
      persona,
      logoutFunction,
      FotoPerfil,
      randomColor,
      isLoading,
      userLocal
    };
  }
};
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
</style>