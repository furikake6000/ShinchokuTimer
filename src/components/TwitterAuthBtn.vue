<template>
  <div v-if="user.uid" key="login">
    {{ user.displayName }} としてログイン中です
    <button type="button" @click="logout">ログアウト</button>
  </div>
  <div v-else key="logout">
    ログインしていません
    <button type="button" @click="login">ログイン</button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  
  export default {
    name: 'TwitterAuthBtn',
    data() {
      return {
        user: {}
      };
    },
    created: function() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user || {};
      });
    },
    methods: {
      login() {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider);
      },
      logout() {
        firebase.auth().signOut();
      }
    }
  };
</script>
