<template>
  <div class="crear-idea">
    <div class="container">
      <div class="columns">
        <!-- Tarjeta central -->
        <div class="column is-two-thirds">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Crear Idea
              </p>
              <!-- Agrega un botón para cerrar la tarjeta -->
              <a class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-xmark" aria-hidden="true"></i>
                </span>
              </a>
              
            </header>
            <div class="card-content">
              <!-- Inputs de la tarjeta central -->
              <div class="field">
                <label class="label">Título</label>
                <div class="control">
                  <input class="input" v-model="idea.Titulo" type="text" placeholder="Título de la idea">
                </div>
              </div>
              <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                  <textarea class="textarea" v-model="idea.Descripcion" placeholder="Descripción de la idea"></textarea>
                </div>
              </div>
              <div class="field">
                <label class="label">Categoría</label>
                <div class="control">
                  <input class="input" v-model="idea.Categoria" type="text" placeholder="Categoría de la idea">
                </div>
              </div>
              <!-- Agrega más campos aquí según tus necesidades -->
            </div>
          </div>
        </div>
        <!-- Menú a la derecha -->
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Menú
              </p>
            </header>
            <div class="card-content">
              <!-- Contenido del menú a la derecha -->
              <div class="content">
                <!-- Mostrar título, descripción y categoría de la idea -->
                <div class="field" v-for="(amigo, index) in idea.Amigos" :key="index">
        <label class="label" :for="'amigo-' + index">Amigo {{ index + 1 }}:</label>
        <div class="control">
          <input class="input" :id="'amigo-' + index" v-model="idea.Amigos[index]">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="button" @click="addAmigo()">Añadir amigo</button>
        </div>
      </div>
      
      
      
      <div class="field">
        <label class="label" for="publico">Público:</label>
        <div class="control">
          <input class="checkbox" id="publico" type="checkbox" v-model="idea.Publico">
        </div>
      </div>
                <!-- Agrega más detalles aquí si es necesario -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón "Crear Idea" -->
    <div class="container">
      <div class="columns">
        <div class="column">
          <button class="button is-primary" @click="submitIdea()">Crear Idea</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  // Asegúrate de importar tu instancia de Firebase auth
  import { ref, onMounted, watch} from 'vue'
import { getIdeas, addIdea, getNombreByEmail, getUUID, getEmail} from '@/main.js'



export default {
  name: 'CrearIdea',
  setup(props, { emit }) {
    const idea = ref({
      
      Titulo: '',
      Descripcion: '',
      Categoria: '',
      Amigos: [''],
      Fecha: new Date(),
      EmailUsuario: '',
      
      Publico: false,
      Propietario: '',
      IdUsuario: '',
      Likes: 0,

    })

    const ideas = ref([])
    

    
    const fetchIdeas = async () => {
      ideas.value = await getIdeas()
    }
    

    const addAmigo = () => {
      idea.value.Amigos.push('')
    }
    const submitIdea = async () => {
      
      const nombre = await getNombreByEmail()
      idea.value.Propietario = nombre
      idea.value.IdUsuario = await getUUID()
      idea.value.EmailUsuario = await getEmail() // Cambiado de getEmailByEmail a
      await addIdea(idea.value)
      await fetchIdeas()  // Refresca las ideas después de añadir la nueva idea
      emit('idea-creada'); // Emite el evento
      
    }

    onMounted(fetchIdeas)
    watch(ideas, fetchIdeas)

    return {
      getNombreByEmail,
      idea,
      ideas,
      fetchIdeas,
      submitIdea,
      addAmigo
      

    }
  }
}
  </script>