<template>
  <div class="header">
    <h2>You have ...</h2>
    <slot />
    <h2>Shika Sembei(es)!</h2>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
.header{
  height: 10vh;
}

</style>
