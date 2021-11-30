<template>
  <main>
    <div class="p-4 bg-green-700 text-gray-200 flex flex-row items-center justify-between">
      <div class="flex flex-row items-end">
        <div class="present-wrapper present-purple present-sm">
          <div class="present-top"></div>
          <div class="present-bottom">
            <div class="sticker">Merry<br />X-mas</div>
          </div>
        </div>
        <div class="ml-1 present-wrapper present-yellow present-md">
          <div class="present-top"></div>
          <div class="present-bottom">
            <div class="sticker">Merry<br />X-mas</div>
          </div>
        </div>
      </div>
      <router-link to="/" class="text-4xl font-bold">
        * * Advent of Code 2021 * *<br />
      </router-link>
      <div class="flex flex-row items-end">
        <div class="present-wrapper">
          <div class="present-top"></div>
          <div class="present-bottom">
            <div class="sticker">Merry<br />X-mas</div>
          </div>
        </div>
        <div class="ml-1 present-wrapper present-green present-sm">
          <div class="present-top"></div>
          <div class="present-bottom">
            <div class="sticker">Merry<br />X-mas</div>
          </div>
        </div>
        <div class="present-wrapper present-red present-lg z-10" style="margin-left: -.5rem;">
          <div class="present-top"></div>
          <div class="present-bottom">
            <div class="sticker">Merry<br />X-mas</div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </main>
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
