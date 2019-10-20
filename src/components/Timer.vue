<template>
  <div id="timer">
    12:00
  </div>
</template>

<script>
  export default {
    name: 'Timer'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'Memoir';
    src: url('../assets/memoir-square.otf') format('truetype');
  }

  #timer {
    font-family: 'Memoir';
    font-size: 10rem;
  }
</style>
