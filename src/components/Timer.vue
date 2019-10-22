<template>
  <div id="timer">
    <div id="display">{{ timerCountStr }}</div>
    <button class="is-green" v-on:click="start" v-if="!timerObj">
      <font-awesome-icon icon="play" />
      Start
    </button>
    <button class="is-red" v-on:click="stop" v-if="timerObj">
      <font-awesome-icon icon="pause" />
      Stop
    </button>
    <button v-on:click="initialize(30);">
      <font-awesome-icon icon="redo-alt" />
      Reset
    </button>

    <br />

    <button v-for="minute in [1, 3, 5, 10, 30]" v-bind:key="minute" v-on:click="initialize(minute);">
      {{ minute }}min
    </button>
  </div>
</template>

<script>
  import moment from 'moment';
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faRedoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
 
  library.add([faRedoAlt, faPlay, faPause])
  export default {
    name: 'Timer',
    data() {
      return {
        nowDate: moment(),
        timerEndDate: moment(),
        timerObj: null,
        remainTime: null,
      }
    },
    created: function() {
      this.initialize(30);
    },
    methods: {
      update: function() {
        this.nowDate = moment();
      },

      start: function() {
        if (this.timerObj) return;

        this.nowDate = moment();
        this.timerEndDate = moment().add(this.remainTime);
        this.timerObj = setInterval(function() {this.update()}.bind(this), 100);
      },

      stop: function() {
        if (!this.timerObj) return;

        this.remainTime = this.timerEndDate.diff(this.nowDate);
        clearInterval(this.timerObj);
        this.timerObj = null;
      },

      initialize: function(minutes) {
        this.stop();
        this.remainTime = minutes * 60 * 1000; // milliseconds
      },
    },
    computed: {
      timerCountStr: function() {
        if (this.timerObj){
          if (this.nowDate.isAfter(this.timerEndDate)) {
            return "0:00";
          }
          return moment(this.timerEndDate.diff(this.nowDate)).format("m:ss");
        }else{
          return moment(this.remainTime).format("m:ss");
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='sass'>
  @font-face
    font-family: 'Memoir'
    src: url('../assets/memoir-square.otf') format('truetype')

  #timer
    font-family: 'Memoir'

    #display
      font-size: 10rem

    button
      margin: 10px
      padding: 20px
      width: 200px
      height: 200px
      font-family: 'Memoir'
      font-size: 2rem
      color: white
      background-color: gray
      border-radius: 50%
      svg
        padding: 10px
        font-size: 4rem
      &.is-red
        background-color: red
      &.is-green
        background-color: green
</style>
