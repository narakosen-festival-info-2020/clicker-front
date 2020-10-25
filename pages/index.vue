<template>
  <div class="click">
    <img :class="['big-click', {'big-click-fire' : bcf}]" src="@/assets/bigClick.png" alt="bigClick" @click="click">
  </div>
</template>

<script>
export default {
  data () {
    return {
      bcf: false
    }
  },
  methods: {
    click () {
      this.bcf = false
      requestAnimationFrame(() => {
        this.bcf = true
        console.log(this.bcf)
      })
      console.log(this.bcf)
      this.$store.dispatch('clicker/increment', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.big-click{
  @include center;
  height: min(70vmin, 288px);
  width: min(70vmin, 288px);
}

.big-click-fire{
  animation: anime .5s linear;
}

@keyframes anime {
  0% {transform: translate(-50%,-50%) scale(1);}
  10% {transform: translate(-50%,-50%) scale(.7);}
  20% {transform: translate(-50%,-50%) scale(1);}
  30% {transform: translate(-50%,-50%) scale(.9);}
  70% {transform: translate(-50%,-50%) scale(1.1);}
  80% {transform: translate(-50%,-50%) scale(1);}
  90% {transform: translate(-50%,-50%) scale(1.3);}
  100% {transform: translate(-50%,-50%) scale(1);}
}
</style>
