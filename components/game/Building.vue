<template>
  <div class="building" @click="buy(100)">
    <p>
      施設(試用でクリックで100消費します)
    </p>
  </div>
</template>

<script>
export default {
  name: 'Building',
  methods: {
    buy (cost) {
      this.$emit('buy', cost)
    }
  }
}
</script>

<style scoped>
</style>
