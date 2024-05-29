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
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
<!-- informacion de la persona a la derecha de pantalla con estilos de bulma-->
<div v-if="showForm">
      
      <CrearIdea @idea-creada="showForm = false"/> <!-- Escucha el evento aquí -->
      <button class="button is-info" @click="showForm = false">cancelar</button>
    </div>
    <div v-else>
      <div v-if="searchValue.length <1">
  <div class="columns vh-100">
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
        <!-- boton para seguir a la persona -->
        <div class="card-footer">
          <button class="button is-primary is-fullwidth">Seguir</button>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="columns is-multiline is-centered idea">
      <div class="column " v-for="idea in personIdeas" :key="idea.id">
        <div class="card idea">
          <div class="card-content idea">
            <div class="content">
              <div class="columns is-vcentered">
            <div class="column is-narrow">
              <p>{{ idea.Propietario }}</p>
            </div>
            <div class="column">
              <p class="has-text-right">{{ formatDate(idea.Fecha) }}</p>
            </div>
          </div>
          <h2 class="title">{{ idea.Titulo }}</h2>
              <div class="field">
      
              <div class="control description-container">
                <p class="description-text" :class="{ 'is-clamped': isClamped }">{{ idea.Descripcion }}</p>
                <button v-if="isClamped" class="button buttonMore is-info is-small" @click="isClamped = false">Saber más</button>
              </div>
            </div>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              
              <button class="button is-danger like-button" :class="'like-button-' + index" @click.stop="addLike(idea, index)">
                <span class="icon">
                  <i class="fas fa-heart"></i> <!-- Icono de corazón -->
                </span>
                <span>{{ idea.Likes }}</span> <!-- Mostrar cantidad de likes -->
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
  <div v-else>
        <div v-if="selectedIdea" class="columns is-centered">
  <!-- Muestra la idea seleccionada -->
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="columns is-vcentered">
            <div class="column is-narrow">
              <p>{{ selectedIdea.Propietario }}</p>
            </div>
            <div class="column">
              <p class="has-text-right">{{ formatDate(selectedIdea.Fecha) }}</p>
            </div>
          </div>
          <h2 class="title">{{ selectedIdea.Titulo }}</h2>
          <p>{{ selectedIdea.Descripcion }}</p>
          <p><strong>Categoría:</strong> {{ selectedIdea.Categoria }}</p>
          <p><strong>Amigos:</strong> {{ selectedIdea.Amigos.join(', ') }}</p>

          <button class="button is-info" @click="selectedIdea = null">Volver a la lista</button>
        </div>
      </div>
    </div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Comentarios
        </p>
      </header>
      <div class="card-content">
        <div class="content ">
          <div class="comentarios">
  <div class="comment-container" v-for="(comentario, index) in comentarios" :key="index">
    <!-- Foto de perfil y nombre de usuario -->
    <div class="comment-header">
      <div class="profile-image-container" v-if="comentario.FotoUsuario || comentario.FotoUsuario.length>=1">
        <img class="profile-image" :src="comentario.FotoUsuario" alt="Foto de perfil">
      </div>
      <div class="profile-image-container" v-else :style="{ backgroundColor: randomColor() }">
    <p class="title is-1 has-text-white has-text-centered">{{ comentario.Nombre.substring(0, 2) }}</p>
  </div>
      <p class="comment-username">{{ comentario.Nombre}}</p>
    </div>
    <!-- Contenido del comentario -->
    <div class="comment-content">{{ comentario.Contenido }}</div>
    <!-- Fecha del comentario -->
    <p class="comment-time">{{ formatDate(comentario.Fecha) }}</p>
    <!-- Likes -->
    <div class="comment-likes">
      <button class="button is-danger like-button" :class="'like-button-' + index" @click.stop="addLike(comentario, index)">
        <span class="icon">
          <i class="fas fa-heart"></i>
        </span>
        <span>{{ comentario.Likes }}</span>
      </button>
    </div>
  </div>
</div>
          
          <div>
            <label class="label">Nuevo comentario</label>
            <div class="field">
              <div class="control">
                <textarea class="textarea" v-model="nuevoComentario.Contenido" @keyup.enter="agregarComentario" placeholder="Escribe un comentario"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="agregarComentario">Agregar comentario</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
      <div v-else class="columns is-multiline">
        
      <div class="column is-one-third" v-for="(idea, index) in searchResultsIdeas" :key="index" @click="selectIdea(idea)">
        <div class="card idea">
          <div class="card-content">
            <div class="content">
              <div class="columns is-vcentered">
            <div class="column is-narrow">
              <p>{{ idea.Propietario }}</p>
            </div>
            <div class="column">
              <p class="has-text-right">{{ formatDate(idea.Fecha) }}</p>
            </div>
          </div>
          <h2 class="title">{{ idea.Titulo }}</h2>
              <div class="field">
      
              <div class="control description-container">
                <p class="description-text" :class="{ 'is-clamped': isClamped }">{{ idea.Descripcion }}</p>
                <button v-if="isClamped" class="button buttonMore is-info is-small" @click="isClamped = false">Saber más</button>
              </div>
            </div>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              
              <button class="button is-danger like-button" :class="'like-button-' + index" @click.stop="addLike(idea, index)">
                <span class="icon">
                  <i class="fas fa-heart"></i> <!-- Icono de corazón -->
                </span>
                <span>{{ idea.Likes }}</span> <!-- Mostrar cantidad de likes -->
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="column is-one-fifth" v-for="(persona, index) in searchResultsUsers" :key="index" @click="pageUser(persona.Email)"  >
        <div class="card persona" >
    <div class="card-image persona">
      <figure class="image is-4by3" v-if="persona.FotoPerfilURL || persona.FotoPerfilURL>=1">
        <img :src="persona.FotoPerfilURL" alt="Foto de perfil">
      </figure>
      <!-- si no tiene foto utilizara un fondo de un color aleatorio y con su letra inicial de su nombre -->
      <div class="image is-4by3" v-else :style="{ backgroundColor: randomColor() }">
    <p class="title is-1 has-text-white has-text-centered">{{ persona.Nombre.substring(0, 2) }}</p>
  </div>
    </div>
    <div class="card-content persona" >
      <div class="media">
        <div class="media-content">
          <p class="subtitle is-4">{{ persona.Nombre }}</p>
          <p class="subtitle is-6">{{ persona.Email }}</p>
        </div>
      </div>

      <div class="content">
        Ciudad: {{ persona.Ciudad }}
      </div>
    </div>
  </div>
      </div>
      </div>
      
    
    </div>

</div>
<!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    
  </div>
</template>
<script>
import { ref, onMounted, watch } from 'vue';
import CrearIdea from '@/components/CrearIdea.vue';
//router
import { useRoute } from 'vue-router';
import { format } from 'date-fns';

import { getOtraPersonaByEmail, getPersonas, getIdeas, getPersonIdeas} from '@/main.js';
export default {
    name: 'UserPage',
    components: {
        CrearIdea
    },
   
  setup() {
    const route = useRoute()
    const userLocal = ref(JSON.parse(localStorage.getItem('user')));
    const showForm = ref(false); 
    const searchValue = ref('');
    const searchResultsIdeas = ref([]);
    const searchResultsUsers = ref([]);
    const nombreUsuario1 = ref('')
    const fotoPerfil = ref('')
    const otraPersona = ref([])
    const personIdeas = ref([])
    const isActive = ref(false);
    const persona = ref([])
    const randomColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return `#${randomColor}`;
};
const toggleBurger = () => {
      isActive.value = !isActive.value;
    };
const formatDate = (timestamp) => {
      const date = timestamp.toDate(); // Convierte el timestamp a una fecha de JavaScript
      return format(date, 'dd/MM/yyyy'); // Formatea la fecha
    };
    const search = async () => {
  const ideaFilter = await getIdeas();
  const userFilter = await getPersonas(); // Agrega esta línea
  searchResultsUsers.value = []; // Limpia los resultados de búsqueda existentes
  searchResultsIdeas.value = []; // Limpia los resultados de búsqueda existentes
  for (let i = 0; i < ideaFilter.length; i++) {
    if (ideaFilter[i].Titulo.toLowerCase().includes(searchValue.value.toLowerCase())) {
      searchResultsIdeas.value.push(ideaFilter[i]);
    }
  }
  for (let i = 0; i < userFilter.length; i++) {
    if (userFilter[i].Nombre.toLowerCase().includes(searchValue.value.toLowerCase())) {
      searchResultsUsers.value.push(userFilter[i]);
    }
  }
};

  watch(searchValue, () => {
      if (searchValue.value.length > 1) {
        search();
      } else {
        searchResultsIdeas.value = [];
      }
    });
    onMounted(async () => {
        
       persona.value = await getOtraPersonaByEmail(userLocal.value.email)
      fotoPerfil.value = persona.value.FotoPerfilURL
      nombreUsuario1.value = persona.value.Nombre
        otraPersona.value = await getOtraPersonaByEmail(route.params.email);
        personIdeas.value = await getPersonIdeas(route.params.email);
       
      

    })
    
    return {
        route,
      isDarkMode: false,
        nombreUsuario1,
        fotoPerfil,
        userLocal,
        formatDate,
         otraPersona,
        personIdeas,
        randomColor,
        persona,
        isActive,
        toggleBurger,
        searchValue,
        showForm,
        searchResultsIdeas,
        searchResultsUsers,
        search,




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