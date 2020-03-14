<template>
  <div id="tasksIndex">
    <h1>やること一覧</h1>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TasksIndex',
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user || {};
    });
  },
  data() {
    return {
      tasks: {}
    };
  },
  methods: {
  }
};
</script>

<style scoped lang='sass'>
h1
  display: block
  color: #4CC729
  background-color: #C2EFB5
  margin: 0
  padding: 2.5rem 0 1rem 0
</style>
