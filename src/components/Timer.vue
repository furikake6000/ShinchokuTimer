<template>
  <div id="timer">
    <div id="display">
      <div class="bar" v-bind:style="{ width: (1.0 - timeNormalized) * 100 + '%' }" />
      <div class="text">
        <span id="minute" @click="enableMinuteEdit">{{ timerMinuteStr }}<input id="minuteEditor" type="tel" :value="timerMinuteStr" @input="setMinute($event.target.value)" @blur="disableMinuteEdit" @keydown.enter="disableMinuteEdit" v-if="isMinuteEditing"></span>
        <span>:</span>
        <span id="second" @click="enableSecondEdit">{{ timerSecondStr }}<input id="secondEditor" type="tel" :value="timerSecondStr" @input="setSecond($event.target.value)" @blur="disableSecondEdit" @keydown.enter="disableSecondEdit" v-if="isSecondEditing"></span>
      </div>
    </div>
    <button class="is-green" v-on:click="start" v-if="!timerObj">
      <font-awesome-icon icon="play" />
      Start
    </button>
    <button class="is-red" v-on:click="stop" v-if="timerObj">
      <font-awesome-icon icon="pause" />
      Stop
    </button>
    <button v-on:click="initialize();">
      <font-awesome-icon icon="redo-alt" />
      Reset
    </button>

    <br />

    <button v-for="minute in [1, 3, 5, 10, 30]" v-bind:key="minute" v-on:click="initialize(minute * 60 * 1000);">
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
        defaultLimit: null,
      }
    },
    created: function() {
      this.initialize(30 * 60 * 1000);
    },
    updated: function() {
      document.title = this.timeStr;
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

      initialize: function(limit) {
        this.stop();
        this.remainTime = (limit || this.defaultLimit); // milliseconds
        this.defaultLimit = this.remainTime;
      },

      setMinute: function(minutes) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('minute', parseInt(minutes,10));
        this.initialize(currentCount.valueOf());
      },

      setSecond: function(seconds) {
        this.stop();
        var currentCount = moment(this.remainTime);
        currentCount.set('second', parseInt(seconds, 10));
        this.initialize(currentCount.valueOf());
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
      time: function() {
        if (this.timerObj){
          if (this.nowDate.isAfter(this.timerEndDate)) {
            return 0;
          }
          return this.timerEndDate.diff(this.nowDate);
        }else{
          return Math.max(this.remainTime, 0);
        }
      },
      timeStr: function() {
        return moment(this.time).format("m:ss");
      },
      timerMinuteStr: function() {
        return moment(this.time).minute();
      },
      timerSecondStr: function() {
        return ('00' + moment(this.time).second()).slice(-2);
      },
      timeNormalized: function() {
        return this.time / this.defaultLimit;
      },
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
      position: relative
      background-color: #e8f1ff
      font-size: 10rem
      line-height: 14rem
      height: 14rem

      .text
        span
          position: relative
          input[type="tel"]
            position: absolute
            left: 0
            top: 0
            font-family: 'Memoir'
            font-size: 6rem
            text-align: center
            min-width: 6rem
            width: 100%
            height: 100%

      .bar
        position: absolute
        content: ""
        background-color: #6294e3
        left: 0
        height: 14rem

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
