<template>
  
  <div class="crear-idea">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Crear Idea
              </p>
            </header>
            <div class="card-content">
              <form @submit.prevent="submitIdea">
                <div class="field">
                  <label class="label" for="titulo">Título:</label>
                  <div class="control">
                    <input class="input" id="titulo" v-model="idea.Titulo" required>
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="descripcion">Descripción:</label>
                  <div class="control">
                    <textarea class="textarea" id="descripcion" v-model="idea.Descripcion" required></textarea>
                  </div>
                </div>
                <div class="field">
        <label class="label" for="categoria">Categoría:</label>
        <div class="control">
          <input class="input" id="categoria" v-model="idea.Categoria">
        </div>
      </div>
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
        <label class="label" for="fecha">Fecha:</label>
        <div class="control">
          <input class="input" id="fecha" type="date" v-model="idea.Fecha">
        </div>
      </div>
      <div class="field">
        <label class="label" for="forma">Forma:</label>
        <div class="control">
          <input class="input" id="forma" v-model="idea.Forma">
        </div>
      </div>
      <div class="field">
        <label class="label" for="publico">Público:</label>
        <div class="control">
          <input class="checkbox" id="publico" type="checkbox" v-model="idea.Publico">
        </div>
      </div>
      
                <!-- Más campos aquí -->
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" type="submit">Crear Idea</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  // Asegúrate de importar tu instancia de Firebase auth
  import { ref, onMounted, watch} from 'vue'
import { getIdeas, addIdea, getNombreByEmail, getUUID } from '@/main.js'


export default {
  name: 'CrearIdea',
  setup() {
    const idea = ref({
      Titulo: '',
      Descripcion: '',
      Categoria: '',
      Amigos: [''],
      Fecha: '',
      Forma: '',
      Publico: false,
      Propietario: '',
      IdUsuario: '',

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
      await addIdea(idea.value)
      await fetchIdeas()  // Refresca las ideas después de añadir la nueva idea
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