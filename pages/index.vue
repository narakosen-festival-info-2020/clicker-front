<template>
  <div class="click">
    <img class="big-click" src="@/assets/bigClick.png" alt="bigClick" @click="click">
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$store.dispatch('clicker/increment', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.big-click{
  @include center;
  height: 288px;
  width: 288px;
}
</style>
