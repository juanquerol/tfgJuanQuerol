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
            <router-link class="button is-primary" to="/perfil">{{nombreUsuario1}}</router-link>
          </div>
        </div>
      </div>
    </nav>
    <!-- Aquí puedes agregar el contenido adicional que desees mostrar en la página principal -->
    <div v-if="showForm">
      <button class="button is-info" @click="showForm = false">cancelar</button>
      <CrearIdea @idea-creada="showForm = false"/> <!-- Escucha el evento aquí -->
      
    </div>
    <div v-else>
      <div v-if="searchValue.length <1">
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
              <div class="field">
      
              <div class="control description-container">
                <p class="description-text" :class="{ 'is-clamped': isClamped }">{{ idea.Descripcion }}</p>
                <button v-if="isClamped" class="button buttonMore is-info is-small" @click="isClamped = false">Saber más</button>
              </div>
            </div>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              
              <button class="button is-danger" :class="{ 'animate-like': isAnimating===idea.id }" @click.stop="addLike(idea)">
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
    <button class="button is-primary" @click="showForm = true">crear idea</button>
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
        
      <div class="column is-one-third" v-for="(idea, index) in searchResultsIdeas" :key="index" @click="selectIdea(idea)">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 class="title">{{ idea.Titulo }}</h2>
              <div class="field">
      
              <div class="control description-container">
                <p class="description-text" :class="{ 'is-clamped': isClamped }">{{ idea.Descripcion }}</p>
                <button v-if="isClamped" class="button buttonMore is-info is-small" @click="isClamped = false">Saber más</button>
              </div>
            </div>
              <p><strong>Categoría:</strong> {{ idea.Categoria }}</p>
              <p><strong>Amigos:</strong> {{ idea.Amigos.join(', ') }}</p>
              
              <button class="button is-danger" :class="{ 'animate-like': isAnimating===idea.id }" @click.stop="addLike(idea)">
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
      
    <button class="button is-primary" @click="showForm = true">crear idea</button>
    </div>
    </div>
    
    
    
  </div>
  </template>
  
  <script>
 import { ref, onMounted, watch } from 'vue'
import { getIdeas, getPersonas, cometariosIdea, crearComentario, getUUID, getNombreByEmail,addLikeToIdea  } from '@/main.js'
import CrearIdea from '@/components/CrearIdea.vue'

export default {
  name: 'UserDashboard',
  components: {
    CrearIdea
  },
  setup() {
    const ideas = ref([])
    const comentarios = ref([]);
    const isClamped = ref(true);
    const selectedIdea = ref(null);
    const isAnimating = ref(false); // Define isAnimating aquí
    const showForm = ref(false); // Nuevo estado para mostrar/ocultar el formulario
    let nombreUsuario = ref(''); // Define nombreUsuario aquí
    const searchValue = ref(''); // Define searchValue aquí
    const searchResultsIdeas = ref([]); // Resultados de búsqueda de ideas
    
    const searchResultsUsers = ref([]); // Resultados de búsqueda de nombres de usuario
    const nombreUsuario1 = ref(''); // Define nombreUsuario aquí
   
    
    
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
const addLike = async (idea) => {
      
  
  isAnimating.value = true;
  await addLikeToIdea(idea.id); // Llamar a la función para actualizar el like en la base de datos
  fetchIdeas();
  setTimeout(() => {
    isAnimating.value = false;
  }, 2000);

    };
    onMounted(async () => {
      nombreUsuario1.value = await getNombreByEmail()
      const data = await getIdeas()
  console.log(data)  // Agrega esta línea
  ideas.value = data
    })
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
    

    return {
      isAnimating,
      ideas,
      fetchIdeas,
      selectedIdea,
      selectIdea,
      showForm,
      comentarios,
      agregarComentario,
      nuevoComentario,
      nombreUsuario,
      addLike,
      isClamped,
      searchValue,
      searchResultsIdeas,
      nombreUsuario1,
      searchResultsUsers,
      search,
      

      
      
      
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
.description-container {
  position: relative;
  max-height: 3.6em; /* Altura para dos líneas de texto */
  overflow: hidden;
}

.description-text.is-clamped {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.buttonMore {
  position: absolute;
  bottom: 0;
  right: 0;
}
.animate-like {
  animation: pulse 2s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
  </style>