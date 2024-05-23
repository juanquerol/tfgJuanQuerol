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
            <router-link class="button is-primary" to="/perfil">{{nombreUsuario}}</router-link>
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
import { getIdeas , getMyIdeas, updateIdea, deleteIdea, cometariosIdea, crearComentario, getUUID, getNombreByEmail} from '@/main.js'
import { format } from 'date-fns'

      
export default {
  name: 'UserDashboard',
  components: {
    
  },
  
  
  setup() {
    const ideas = ref([])
    const selectedIdea = ref(null)
    const comentarios = ref([])
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
      nombreUsuario
    }
  }
}
  </script>
  
  <style scoped>
  .cuadrado {
  width: 100px;
  height: 100px;
  background-color: #f00;
}

.circulo {
  width: 100px;
  height: 100px;
  background-color: #f00;
  border-radius: 50%;
}
  

.user-dashboard {
  padding: 1rem;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.navbar-start {
  display: flex;
  gap: 1rem;
}

.navbar-end {
  display: flex;
  gap: 1rem;
}

.navbar-item {
  color: #fff;
}

.navbar-item:hover {
  color: #00d1b2;
}
  </style>