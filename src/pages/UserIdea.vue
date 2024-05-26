<template>
    <div class="user-dashboard">
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
      <div class="profile-image-container">
        <img class="profile-image" :src="FotoPerfil" alt="Foto de perfil">
      </div>

      <!-- Nombre de usuario -->
      <router-link class="username" to="/perfil">{{ nombreUsuario }}</router-link>
    </div>
          </div>
          

        </div>
      </div>
    </nav>
    
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    <div v-if="selectedIdea" class="columns is-centered">
      <div class="column is-half">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ selectedIdea.Titulo }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>{{ selectedIdea.Descripcion }}</p>
            <p><strong>Categoría:</strong> {{ selectedIdea.Categoria }}</p>
            <p><strong>Amigos:</strong> {{ selectedIdea.Amigos.join(', ') }}</p>
            <p><strong>Fecha:</strong> {{ formatDate(selectedIdea.Fecha) }}</p>
            
            <p><strong>Propietario:</strong> {{ selectedIdea.Propietario}}</p>
            <button class="button is-primary" @click="enableEdit(selectedIdea)">Editar</button>
            <button class="button is-danger" @click="deleteIdeaUI(selectedIdea.id)">Eliminar</button>
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
          <div class="content">
            <div class="field" v-for="(comentario, index) in comentarios" :key="index">
              <label class="label">{{ comentario.Persona }}</label>
              <p>{{ comentario.Contenido }}</p>
            </div>
            <div>
              <label class="label">Nuevo comentario</label>
              <div class="field">
                <div class="control">
                  <textarea class="textarea" v-model="nuevoComentario.Contenido" placeholder="Escribe un comentario"></textarea>
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
      <div class="column is-one-third" v-for="(idea, index) in ideas" :key="index" @click="selectIdea(idea)">
        
        <div class="card">
          <div class="card-content">
            
              <div class="content" v-if="idea.editing" @click.stop="">
                  <!-- Formulario de edición -->
                  <div class="field">
      <label class="label">Título</label>
      <div class="control">
        <input class="input" v-model="idea.Titulo" placeholder="Título" >
      </div>
    </div>
    <div class="field">
      <label class="label">Descripción</label>
      <div class="control">
        <textarea class="textarea" v-model="idea.Descripcion" placeholder="Descripción"></textarea>
      </div>
    </div>
                  <!-- Agrega más campos según sea necesario -->
                  <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click.stop="saveIdea(idea)">Guardar</button>
      </div>
      <div class="control">
        <button class="button is-text" @click.stop="cancelEdit(idea)">Cancelar</button>
      </div>
    </div>
  </div>
                <div class="content" v-else>
                  <h2 class="title">{{ idea.Titulo }}</h2>
              <p>{{ idea.Descripcion }}</p>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              <p><strong>Fecha:</strong> {{ formatDate(idea.Fecha) }}</p> <!-- Usa la función formatDate aquí -->
              
              
              <p><strong>Propietario:</strong> {{ idea.Propietario}}</p>
              <button class="button is-primary" @click.stop="enableEdit(idea)">Editar</button>
    <button class="button is-danger" @click.stop="deleteIdeaUI(idea.id)">Eliminar</button>
                </div>
              
              
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </template>
  
  <script>
 import { ref, onMounted } from 'vue'
import { getIdeas , getMyIdeas, updateIdea, deleteIdea, cometariosIdea, crearComentario, getUUID, getNombreByEmail, getPersonaByEmail} from '@/main.js'
import { format } from 'date-fns'

      
export default {
  name: 'UserDashboard',
  components: {
    
  },
  
  
  setup() {
    const ideas = ref([])
    const selectedIdea = ref(null)
    const comentarios = ref([])
    const FotoPerfil = ref(''); // Define nombreUsuario aquí
    const usuario = ref(''); // Define nombreUsuario aquí
    const nuevoComentario = ref({
      Contenido: '',
      IdPersona: '',
      IdIdea: '',
      Persona: ''
    })
    const nombreUsuario = ref('')
    const selectIdea = async (idea) => {
      selectedIdea.value = idea
      if (idea.id) {
        comentarios.value = await cometariosIdea(idea.id)
      }
    }

    const agregarComentario = async () => {
      if (selectedIdea.value && selectedIdea.value.id) {
        nuevoComentario.value.IdPersona = await getUUID()
        const nombreUsuario = await getNombreByEmail()
        nuevoComentario.value.Persona = nombreUsuario
        await crearComentario(selectedIdea.value.id, nuevoComentario.value.Contenido, nuevoComentario.value.IdPersona, nuevoComentario.value.Persona)
        comentarios.value = await cometariosIdea(selectedIdea.value.id)
      }
    }
    const formatDate = (timestamp) => {
      const date = timestamp.toDate(); // Convierte el timestamp a una fecha de JavaScript
      return format(date, 'dd/MM/yyyy'); // Formatea la fecha
    };
    const saveIdea = async (idea) => {
  await updateIdea(idea.id, { Titulo: idea.Titulo, Descripcion: idea.Descripcion /* otros campos */ });
  idea.editing = false;
}
const deleteIdeaUI = async (id) => {
      await deleteIdea(id); // Llama al método deleteIdea de main.js
      ideas.value = ideas.value.filter(idea => idea.id !== id); // Actualiza la lista de ideas en la UI
    }

    const cancelEdit = (idea) => {
      idea.editing = false
    }

    const enableEdit = (idea) => {
      idea.editing = true
    }
    
    const fetchIdeas = async () => {
  ideas.value = await getIdeas()
}
    onMounted(async () => {
      usuario.value = await getPersonaByEmail()
      console.log(usuario.value)
      FotoPerfil.value = usuario.value.FotoPerfilURL

      nombreUsuario.value = await getNombreByEmail()
      const data = await getMyIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data

    })

    

    return {
      
      ideas,
      fetchIdeas,
      saveIdea,
      cancelEdit,
      enableEdit,
      deleteIdeaUI,
      formatDate,
      selectedIdea,
      selectIdea,
      comentarios,
      agregarComentario,
      nuevoComentario,
      nombreUsuario,
      FotoPerfil,
      usuario
    }
  }
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
  </style>