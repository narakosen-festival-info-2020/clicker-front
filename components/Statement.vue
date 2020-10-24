<template>
  <div class="section">
    <h1 class="section-title">
      {{ title }}
    </h1>
    <div v-for="statement in statements" :key="statement.name" class="subsection">
      <h2 class="subsection-title">
        {{ statement.subtitle }}
      </h2>
      <p class="statement-number">
        {{ statement.value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statement',
  props: {
    title: {
      type: String,
      default: 'セクションタイトル'
    },
    statements: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section{
  text-align: center;
  h1, h2 {
    text-align: left;
  }
}
</style>
