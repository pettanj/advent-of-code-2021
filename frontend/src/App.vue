<template>
  <div id="nav" class="p-4 bg-green-700 text-gray-200 flex flex-row items-center justify-center">
    <router-link to="/" class="text-5xl font-bold">
    Home
    </router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
