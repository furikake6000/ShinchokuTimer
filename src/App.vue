<template>
  <div id="app" class="container">
    <Timer />
  </div>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'app',
  components: {
    Timer
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

html {
  font-size: 100%;
  @include mobile {
    font-size: calc(60% + 1.2vw);
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
