<template>
  <div class="User">
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
        <router-link class="navbar-item" to="/dashboard">Dashboard</router-link>
        <router-link class="navbar-item" to="/popular">Popular</router-link>
        <router-link class="navbar-item" to="/novedad">Novedades</router-link>
        <router-link class="navbar-item" to="/amigos">Amigos</router-link>
        <router-link class="navbar-item" to="/chat">Chat</router-link>
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

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title has-text-centered">Perfil de usuario</h1>

            <form v-if="showForm" @submit.prevent="updatePerfil">
              <div class="field">
                <div class="file is-boxed has-name">
                  <label class="file-label">
                    <input class="file-input is-small" type="file" @change="selectImage($event)">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">Seleccionar foto de perfil...</span>
                    </span>
                  </label>
                </div>
              </div>
          
              <div class="field">
                <label class="label">Nombre de usuario</label>
                <div class="control has-icons-left">
                  <input class="input is-medium" type="text" v-model="user.Nombre" placeholder="Nombre de usuario">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>

              

              <div class="field">
                <label class="label">Fecha de nacimiento</label>
                <div class="control has-icons-left">
                  <input class="input is-medium" type="date" v-model="user.Birthdate" placeholder="Fecha de Cumpleaños">
                  <span class="icon is-small is-left">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
              </div>

              
              <div class="field">
                <label class="label">País</label>
                <div class="control has-icons-left">
                  <input class="input is-medium" type="text" v-model="user.Pais" placeholder="País">
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Ciudad</label>
                <div class="control has-icons-left">
                  <input class="input is-medium" type="text" v-model="user.Ciudad" placeholder="Ciudad">
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
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
         <div class="card persona" >
          <div class="card-image persona">
            <figure class="image is-4by3" v-if="FotoPerfil || FotoPerfil>=1">
              <img :src="FotoPerfil" alt="Foto de perfil">
            </figure>
              <!-- si no tiene foto utilizara un fondo de un color aleatorio y con su letra inicial de su nombre -->
            <div class="image is-4by3" v-else :style="{ backgroundColor: randomColor() }">
              <p class="title is-1 has-text-white has-text-centered">{{ nombreUsuario1.substring(0, 2) }}</p>
            </div>
          </div>
          <div class="card-content persona" >
            <div class="media">
              <div class="media-content">
                <p class="subtitle is-4" v-if="persona">{{ persona.Nombre }}</p>
                <p class="subtitle is-6" v-if="persona">{{ persona.Email }}</p>
              </div>
            </div>
            <div class="content" v-if="persona">
              Fecha de nacimiento: {{ persona.Birthdate }}
            </div>
            <div class="content" v-if="persona">
              País: {{ persona.Pais }}
            </div>

            <div class="content" v-if="persona">
              Ciudad: {{ persona.Ciudad }}
            </div>
          </div>
          <div class="buttons">
            <button class="button is-danger" @click="logoutFunction">Logout</button>
            <button class="button is-primary" @click="showForm = true">Editar perfil</button>
          </div>
        </div>

          <!-- Botones de logout y editar perfil -->
          
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
    const isActive = ref(false);
    const user = {
      Nombre: '',
      Birthdate: '',
      Ciudad: '',
      Pais: '',
      FotoPerfilURL: '',
      Email: userLocal.value.Email,
      Password: userLocal.value.Password

    };
    const toggleBurger = () => {
      isActive.value = !isActive.value;
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
    // Recolectar los datos del formulario
    const userData = {
      Nombre: user.Nombre,
      Birthdate: user.Birthdate,
      Ciudad: user.Ciudad,
      Pais: user.Pais,
      FotoPerfilURL: FotoPerfil.value // Asegúrate de incluir la URL de la foto de perfil si es relevante
    };

    // Llamar a la función de actualización de perfil con el ID del usuario y los datos actualizados
    await updateProfile(persona.value.id, userData);
    // Redirigir al usuario a la página de dashboard u otra página después de la actualización exitosa
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
      userLocal,
      toggleBurger,
      isActive
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
  margin-top: 1rem;
  background-color: #00d1b2;
}

.button.is-info:hover {
  background-color: #00b89c;
}

.button.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.button.is-primary:hover {
  background-color: #004dd1;
  color: #fff;
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
.card.idea {
  background-color: #f7fafc; /* Color de fondo */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
  margin-bottom: 20px;
  transition: transform 0.3s ease; /* Transición suave al pasar el cursor */
}

.card.idea:hover {
  transform: translateY(-5px); /* Efecto de elevación al pasar el cursor */
}

.card.idea .card-header {
  background-color: #209cee; /* Color de encabezado */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
}

.card.idea .card-header p {
  color: #fff; /* Color del texto en el encabezado */
  font-size: 1.2rem;
  font-weight: bold;
}

.card.idea .card-content {
  padding: 15px;
}

.card.idea .content {
  color: #4a4a4a; /* Color del texto en el contenido */
}

.card.idea .card-footer {
  background-color: #f7fafc; /* Color del pie de tarjeta */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  text-align: right;
}

.card.idea .card-footer .button {
  background-color: #ff3860; /* Color del botón */
  color: #fff; /* Color del texto del botón */
  border-radius: 20px;
  padding: 5px 15px;
  transition: background-color 0.3s ease; /* Transición suave */
}

.card.idea .card-footer .button:hover {
  background-color: #e20d41; /* Color de fondo del botón al pasar el cursor */
}
</style>