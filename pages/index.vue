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
      })
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
  animation: anime 1s linear;
}
</style>
