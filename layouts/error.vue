<template>
  <div class="error">
    <div class="message">
      <p>
        <strong>
          Error has occurred
        </strong>
      </p>
    </div>
    <nuxt-link to="/">
      クリックページへ戻る
    </nuxt-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.error{
  text-align: center;
  margin: auto;
}
</style>
