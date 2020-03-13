<template>
  <div id="topMenu">
    <div v-if="user.uid">
      <a href="/task/create" class="blockbtn btn-primary">
        <p class="text-large">やること登録</p>
      </a>
      <a class="blockbtn btn-primary">
        <p class="text-large">やること実行</p>
      </a>
      <a class="blockbtn">
        <p class="text-medium">記録を見る</p>
      </a>
      <a @click="logout" class="blockbtn">
        <p class="text-medium">ログアウト</p>
      </a>
    </div>
    <div v-else>
      <a @click="login" class="blockbtn btn-twitter">
        <p class="text-medium">Twitterで</p>
        <p class="text-large">ログイン</p>
        <p class="text-desc">タップするとポップアップが開きます</p>
      </a>
      <a class="blockbtn">
        <p class="text-medium">使い方</p>
      </a>
    </div>
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
#topMenu
  margin-bottom: 3rem
</style>
