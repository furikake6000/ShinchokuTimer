<template>
  <div id="topMenu">
    <a @click="login" class="blockbtn btn-twitter">
      <p class="text-medium">Twitterで</p>
      <p class="text-xlarge">ログイン</p>
      <p class="text-desc">タップするとポップアップが開きます</p>
    </a>
    <a class="blockbtn">
      <p class="text-large">使い方</p>
    </a>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TopMenu',
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

<style scoped lang='sass'>
.blockbtn
  display: block
  color: white
  background-color: #959595
  margin: 1.5rem 0
  padding: 1.5rem 0
  p
    margin: 0
    line-height: 130%
  .text-xlarge
    font-weight: bold
    font-size: 3rem
  .text-large
    font-weight: bold
    font-size: 2.25rem
  .text-medium
    font-weight: bold
    font-size: 1.5rem
  .text-desc
    font-size: 0.9rem

.btn-twitter
  background-color: #1DA1F2
</style>
