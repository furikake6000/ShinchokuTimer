<template>
  <div id="timer">
    <div id="display">
      <span id="minute" @click="enableMinuteEdit">{{ timerMinuteStr }}<input id="minuteEditor" type="tel" :value="timerMinuteStr" @input="setMinute($event.target.value)" @blur="disableMinuteEdit" @keydown.enter="disableMinuteEdit" v-if="isMinuteEditing"></span>
      <span>:</span>
      <span id="second" @click="enableSecondEdit">{{ timerSecondStr }}<input id="secondEditor" type="tel" :value="timerSecondStr" @input="setSecond($event.target.value)" @blur="disableSecondEdit" @keydown.enter="disableSecondEdit" v-if="isSecondEditing"></span>
    </div>
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

    <button class="minutes-button" v-for="minute in [1, 3, 5, 10, 30]" v-bind:key="minute" v-on:click="initialize(minute);">
      <span class="minutes">{{ minute }}</span>min
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
        isMinuteEditing: false,
        isSecondEditing: false,
      }
    },
    created: function() {
      this.initialize(30);
    },
    updated: function() {
      document.title = this.timerCount.format("m:ss");
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

      setMinute: function(minutes) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('minute', parseInt(minutes,10));
        this.remainTime = currentCount.valueOf();
      },

      setSecond: function(seconds) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('second', parseInt(seconds, 10));
        this.remainTime = currentCount.valueOf();
      },

      enableMinuteEdit: function() {
        this.isMinuteEditing = true;
        // v-ifで表示されるのを待機するため、10ミリ秒遅延
        setTimeout(function() {document.getElementById('minuteEditor').focus()}, 10);
      },
      disableMinuteEdit: function() {
        this.isMinuteEditing = false;
      },

      enableSecondEdit: function() {
        this.isSecondEditing = true;
        // v-ifで表示されるのを待機するため、10ミリ秒遅延
        setTimeout(function() {document.getElementById('secondEditor').focus()}, 10);
      },
      disableSecondEdit: function() {
        this.isSecondEditing = false;
      },
    },
    computed: {
      timerCount: function() {
        if (this.timerObj){
          if (this.nowDate.isAfter(this.timerEndDate)) {
            return moment(0);
          }
          return moment(this.timerEndDate.diff(this.nowDate));
        }else{
          return moment(Math.max(this.remainTime, 0));
        }
      },
      timerMinuteStr: function() {
        return this.timerCount.minute();
      },
      timerSecondStr: function() {
        return ('00' + this.timerCount.second()).slice(-2);
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
      span
        position: relative
        input[type="tel"]
          position: absolute
          left: 0
          top: 0
          font-size: 6rem
          text-align: center
          min-width: 6rem
          width: 100%
          height: 100%

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
      &.minutes-button
        width: 150px
        height: 150px
        font-size: 1.5rem
        .minutes
          font-size: 2rem
      &.is-red
        background-color: red
      &.is-green
        background-color: green
</style>
