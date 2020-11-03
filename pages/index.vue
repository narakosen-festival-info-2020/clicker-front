<template>
  <div class="click">
    <img :class="['big-click', {'big-click-fire' : bcf}, {'big-click-stay': !bcf}]" src="@/assets/bigClick.png" alt="bigClick" @click="click">
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
      requestAnimationFrame(() => {
        this.bcf = !this.bcf
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

.big-click-stay{
  animation: anime_stay 1s linear;
}
</style>
