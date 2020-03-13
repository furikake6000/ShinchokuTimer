<template>
  <div id="app" class="container">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="sass">
@import "./assets/stylesheets/global.sass"

body
  margin: 0
#app
  font-family: Roboto, 'HiraKakuProN-W6', 'Yu Gothic', 'Meiryo UI', -apple-system, blinkMacSystemFont, sans-serif
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
</style>
