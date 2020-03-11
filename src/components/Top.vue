<template>
  <div id="top">
    <Logo />
    <div class="bottom-fixed">
      <TopMenu />
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue';
import TopMenu from './TopMenu.vue';

export default {
  name: 'Top',
  components: {
    Logo,
    TopMenu
  }
};
</script>

<style scoped lang='sass'>
.bottom-fixed
  position: fixed
  width: 100%
  bottom: 0
</style>
