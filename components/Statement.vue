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
  margin: 0 auto;
  width: calc(min(100%, 600px) - 16px);
  text-align: center;
  padding: 0 8px;
  h1{
    display: flex;
    align-items: center;
    &::before, &::after {
      content: "";
      height: 2px;
      flex-grow: 1;
      background-color: black;
    }

    &::before {
      margin-right: 1rem;
    }

    &::after {
      margin-left: 1rem;
    }
  }
  h2 {
    text-align: left;
  }

  @include sp {
    h1{
      font-size: 1.5rem;
    }
    h2{
      font-size: 1.2rem;
    }
  }
}
</style>
