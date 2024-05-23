<template>
  <div class="User">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/dashboard">Inicio</router-link>
        <router-link class="navbar-item" to="/amigos">Amigos</router-link>
        <router-link class="navbar-item" to="/populares">Populares</router-link>
        <router-link class="navbar-item" to="/MyIdeas">Mis Ideas</router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link class="button is-primary" to="/perfil">{{nombreUsuario1}}</router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="title has-text-centered">Perfil de usuario</h1>

            <form @submit.prevent="updateProfile">
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input" type="text" v-model="user.name" placeholder="Nombre">
                </div>
              </div>

              <div class="field">
                <label class="label">Correo electrónico</label>
                <div class="control">
                  <input class="input" type="email" v-model="user.email" placeholder="Correo electrónico">
                </div>
              </div>

              <div class="field">
                <label class="label">Fecha de nacimiento</label>
                <div class="control">
                  <input class="input" type="date" v-model="user.birthdate" placeholder="Fecha de nacimiento">
                </div>
              </div>

              <div class="field">
                <label class="label">Teléfono</label>
                <div class="control">
                  <input class="input" type="tel" v-model="user.phone" placeholder="Teléfono">
                </div>
              </div>

              <!-- Agrega más campos aquí según sea necesario -->

              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth">Actualizar perfil</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { onMounted , ref} from 'vue';
import { getNombreByEmail} from '@/main';

export default {
  name: 'UserPerfil',
  setup() {
    // Aquí puedes inicializar tus variables y funciones
    const nombreUsuario1 = ref(''); // Define nombreUsuario aquí
    const user = {
      Nombre: '',
      Email: ' ',
        Cumpleaños: '',
        Telefono: ''
        // Agrega más campos según sea necesario
    }
    const updateProfile = () => {
      // Aquí puedes enviar los datos del formulario a tu API
    }
    onMounted(async() => {
      nombreUsuario1.value = await getNombreByEmail()
      // Aquí puedes cargar los datos del usuario
      
    });
     return {
      user,
      updateProfile,
      nombreUsuario1
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