<template>
  <RouterView/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {
  
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  width: 100%;
}

router-link-active {
  color: red;
}
html {
  scrollbar-width: none; /* Para Firefox */
  overflow: -moz-scrollbars-none;
}

body::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Edge */
}
</style>
