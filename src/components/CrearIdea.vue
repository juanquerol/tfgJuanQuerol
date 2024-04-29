<template>
    <div class="crear-idea">
      <form @submit.prevent="submitIdea">
        <div>
          <label for="titulo">Título:</label>
          <input id="titulo" v-model="idea.Titulo" required>
        </div>
        <div>
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="idea.Descripcion" required></textarea>
        </div>
        <div>
          <label for="categoria">Categoría:</label>
          <input id="categoria" v-model="idea.Categoria">
        </div>
        <div v-for="(amigo, index) in idea.Amigos" :key="index">
        <label :for="'amigo-' + index">Amigo {{ index + 1 }}:</label>
        <input :id="'amigo-' + index" v-model="idea.Amigos[index]">
      </div>

      <button type="button" @click="addAmigo">Añadir amigo</button>
        <div>
          <label for="fecha">Fecha:</label>
          <input id="fecha" type="date" v-model="idea.Fecha">
        </div>
        <div>
          <label for="forma">Forma:</label>
          <input id="forma" v-model="idea.Forma">
        </div>
        <div>
          <label for="publico">Público:</label>
          <input id="publico" type="checkbox" v-model="idea.Publico">
        </div>
        <button type="submit">Crear Idea</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
import { getIdeas, addIdea } from '@/main.js'

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
      Publico: false
    })

    const ideas = ref([])

    const fetchIdeas = async () => {
      ideas.value = await getIdeas()
    }

    const submitIdea = async () => {
      await addIdea(idea.value)
      await fetchIdeas()  // Refresca las ideas después de añadir la nueva idea
    }

    onMounted(fetchIdeas)
    watch(ideas, fetchIdeas)

    return {
      idea,
      ideas,
      submitIdea
    }
  }
}
  </script>