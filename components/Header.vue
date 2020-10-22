<template>
  <div class="header">
    <h1><slot /></h1>
    <h2>Shika Sembei(s)!</h2>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header{
  overflow: hidden;
  height: 15vh;
}

</style>
