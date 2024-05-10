<template>
    <div class="user-dashboard">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/dashboard">Inicio</router-link>
          <router-link class="navbar-item" to="/amigos">Amigos</router-link>
          <router-link class="navbar-item" to="/populares">Populares</router-link>
          <router-link class="navbar-item" to="/myideas">Mis Ideas</router-link>
        </div>
      </div>
    </nav>
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="(idea, index) in ideas" :key="index">
        
        <div class="card">
          <div class="card-content">
            
              <div class="content" v-if="idea.editing">
                  <!-- Formulario de edición -->
                  <div class="field">
      <label class="label">Título</label>
      <div class="control">
        <input class="input" v-model="idea.Titulo" placeholder="Título">
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
        <button class="button is-link" @click="saveIdea(idea)">Guardar</button>
      </div>
      <div class="control">
        <button class="button is-text" @click="cancelEdit(idea)">Cancelar</button>
      </div>
    </div>
  </div>
                <div class="content" v-else>
                  <h2 class="title">{{ idea.Titulo }}</h2>
              <p>{{ idea.Descripcion }}</p>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              <p><strong>Fecha:</strong> {{ formatDate(idea.Fecha) }}</p> <!-- Usa la función formatDate aquí -->
              <p><strong>Forma:</strong> {{ idea.Forma }}</p>
              
              <p><strong>Propietario:</strong> {{ idea.Propietario}}</p>
              <button class="button is-primary" @click="enableEdit(idea)">Editar</button>
    <button class="button is-danger" @click="deleteIdeaUI(idea.id)">Eliminar</button>
                </div>
              
              
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </template>
  
  <script>
 import { ref, onMounted } from 'vue'
import { getIdeas , getMyIdeas, updateIdea, deleteIdea} from '@/main.js'
import { format } from 'date-fns'


export default {
  name: 'UserDashboard',
  components: {
    
  },
  
  setup() {
    const ideas = ref([])
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
      formatDate
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

.navbar-item {
  color: #fff;
}

.navbar-item:hover {
  color: #00d1b2;
}
  </style>