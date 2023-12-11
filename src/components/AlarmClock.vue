<template>
  <div>
    <h1>{{ countdown }}</h1>
  </div>
</template>

<script>
import { Howl } from "howler";

export default {
  data() {
    return {
      countdown: 25 * 60,
      timer: null,
      sound: new Howl({
        src: ["../"],
      }),
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      this.timer = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          this.sound.play();
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
/* أي أنماط تحتاجها هنا */
</style>
