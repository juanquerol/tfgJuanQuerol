<template>
    <div class="User">
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
            <figure class="image is-48x48">
              <img class="is-rounded" src="url_de_la_imagen_de_perfil" alt="Imagen de perfil">
            </figure>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="container">
        <h1 class="title">Perfil de usuario</h1>

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
          <!-- fecha de nacimiento -->
            <div class="field">
                <label class="label">Fecha de nacimiento</label>
                <div class="control">
                <input class="input" type="date" v-model="user.birthdate" placeholder="Fecha de nacimiento">
                </div>
            </div>
            <!-- telefono -->
            <div class="field">
                <label class="label">Teléfono</label>
                <div class="control">
                <input class="input" type="tel" v-model="user.phone" placeholder="Teléfono">
                </div>
            </div>

          <!-- Agrega más campos aquí según sea necesario -->

          <div class="field">
            <div class="control">
              <button class="button is-link">Actualizar perfil</button>
            </div>
          </div>
        </form>
      </div>
    </section>
    </div>
</template>
<script>
export default {
  name: 'UserPerfil',
  setup() {
    // Aquí puedes inicializar tus variables y funciones
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
     return {
      user,
      updateProfile
     }

  }
}
</script>