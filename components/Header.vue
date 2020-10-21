<template>
  <div class="header">
    <slot />
    <h2>Shika Sembei(s)!</h2>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.header{
  height: 14vh;
}

</style>
