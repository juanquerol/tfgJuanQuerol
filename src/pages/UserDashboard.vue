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
      </div>
    </nav>
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    <div v-if="showForm">
      <button class="button is-info" @click="showForm = false">cancelar</button>
      <CrearIdea @idea-creada="showForm = false"/> <!-- Escucha el evento aquí -->
      
    </div>
    <div v-else>
      <div v-if="selectedIdea" class="columns is-centered">
  <!-- Muestra la idea seleccionada -->
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <div class="content">
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
        <div class="content">
          <div class="field" v-for="(comentario, index) in comentarios" :key="index">
            <label class="label">{{ nuevoComentario.Persona }}</label>
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
            <div class="content">
              <h2 class="title">{{ idea.Titulo }}</h2>
              <p>{{ idea.Descripcion }}</p>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="button is-primary" @click="showForm = true">crear idea</button>
    </div>
    
    
    
  </div>
  </template>
  
  <script>
 import { ref, onMounted } from 'vue'
import { getIdeas, cometariosIdea, crearComentario, getUUID, getNombreByEmail  } from '@/main.js'
import CrearIdea from '@/components/CrearIdea.vue'

export default {
  name: 'UserDashboard',
  components: {
    CrearIdea
  },
  setup() {
    const ideas = ref([])
    const comentarios = ref([]);
    const selectedIdea = ref(null);
    const showForm = ref(false); // Nuevo estado para mostrar/ocultar el formulario
    let nombreUsuario = ref(''); // Define nombreUsuario aquí
    const fetchIdeas = async () => {
  ideas.value = await getIdeas()
}



const selectIdea = async (idea) => {
  selectedIdea.value = idea;
  
  if (idea.id) {
    comentarios.value = await cometariosIdea(idea.id);
  }
};

const nuevoComentario = ref({
  Contenido: '',
  IdPersona: '',
  IdIdea: '',
  Persona: ''
});

const agregarComentario = async () => {
  if (selectedIdea.value && selectedIdea.value.id) {
    // Obtén idPersona antes de llamar a crearComentario
    nuevoComentario.value.IdPersona = await getUUID();
    
    // Obtén nombreUsuario antes de llamar a crearComentario
    nombreUsuario = await getNombreByEmail();
    nuevoComentario.value.Persona = nombreUsuario;

    await crearComentario(selectedIdea.value.id, nuevoComentario.value.Contenido, nuevoComentario.value.IdPersona, nuevoComentario.value.Persona); 

    comentarios.value = await cometariosIdea(selectedIdea.value.id);
  }
};
    onMounted(async () => {
      const data = await getIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data
    })
    

    return {
      
      ideas,
      fetchIdeas,
      selectedIdea,
      selectIdea,
      showForm,
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

.navbar-item {
  color: #fff;
}

.navbar-item:hover {
  color: #00d1b2;
}
  </style>