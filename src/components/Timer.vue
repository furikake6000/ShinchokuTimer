<template>
  <div id="timer">
    {{ timerCountStr }}
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'Timer',
    data() {
      return {
        nowDate: moment(),
        timerEndDate: moment().add(30, 'minutes'),
      }
    },
    created: function() {
      this.initialize();
    },
    methods: {
      initialize: function() {
        setInterval(function() {this.update()}.bind(this), 100)
      },

      update: function() {
        this.nowDate = moment();
      },

      start: function() {
        let self = this;
        this.timerObj = setInterval(function() {self.count()}, 1000)
        this.timerOn = true; //timerがOFFであることを状態として保持
      },

      stop: function() {
        clearInterval(this.timerObj);
        this.timerOn = false; //timerがOFFであることを状態として保持
      },

      complete: function() {
        clearInterval(this.timerObj)
      }
    },
    computed: {
      timerCountStr: function() {
        if (this.nowDate.isAfter(this.timerEndDate)) {
          return "0:00";
        }
        return moment(this.timerEndDate.diff(this.nowDate)).format("m:ss");
      }
    },
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
