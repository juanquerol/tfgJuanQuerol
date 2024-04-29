<template>
    <div class="user-dashboard">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/amigos">Amigos</router-link>
          <router-link class="navbar-item" to="/populares">Populares</router-link>
          <router-link class="navbar-item" to="/mis-ideas">Mis Ideas</router-link>
        </div>
      </div>
    </nav>
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    <div v-for="(idea, index) in ideas" :class="idea.Forma === 'cuadrado' ? 'cuadrado' : 'circulo'" :key="index">
      <h2>{{ idea.Titulo }}</h2>
      <p>{{ idea.Descripcion }}</p>
      <p>{{ idea.Categoria }}</p>
      <p>{{ idea.Amigos }}</p>
      <p>{{ idea.Fecha }}</p>
      <p>{{ idea.Forma }}</p>
      <p>{{ idea.Publico }}</p>
    </div>
    <div>
      <CrearIdea/>
    </div>
  </div>
  </template>
  
  <script>
 import { ref, onMounted } from 'vue'
import { getIdeas } from '@/main.js'
import CrearIdea from '@/components/CrearIdea.vue'

export default {
  name: 'UserDashboard',
  components: {
    CrearIdea
  },
  setup() {
    const ideas = ref([])
    const fetchIdeas = async () => {
  ideas.value = await getIdeas()
}
    onMounted(async () => {
      const data = await getIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data
    })
    

    return {
      
      ideas,
      fetchIdeas
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