<template>
  <div id="app" class="container">
    <Timer />
    <TwitterAuthBtn />
  </div>
</template>

<script>
import Timer from './components/Timer.vue';
import TwitterAuthBtn from './components/TwitterAuthBtn.vue';

export default {
  name: 'app',
  components: {
    Timer,
    TwitterAuthBtn
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

html {
  font-size: 100%;
  @include touch {
    font-size: calc(20% + 2vw);
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
