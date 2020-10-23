<template>
  <div class="facilityDisplay" @click="buy">
    <div class="name">
      <span class="b-text">{{ name }}</span>
    </div>
    <div class="description">
      <span class="b-text">価格{{ representTransform(amount) }}：生産量：{{ num_gen }}</span>
    </div>
    <div class="amount">
      <span class="b-text-center">{{ num_hold }}台</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'temp'
    }
  },
  data () {
    return {
      amount: 0,
      num_gen: 0,
      num_hold: 0
    }
  },
  created () {
    this.loadFacility()
  },
  methods: {
    async buy () {
      this.ip = await this.$axios.$post(`/api/facility/${this.name}`)
        .catch((error) => {
          alert(`購入できませんでした${error}`)
        })
      await this.loadFacility()
    },
    async loadFacility () {
      await this.$axios.$get(`/api/facility/${this.name}`, {
        responseType: 'json'
      })
        .then((response) => {
          this.amount = response.amount
          this.num_hold = response.num_hold
          this.num_gen = response.num_gen
        })
        .catch((error) => {
          alert('サーバーエラー')
          alert(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.facilityDisplay{
  cursor: pointer;
  overflow: hidden;
  margin: 12px auto;
  background: #ddddce;
  width: 70%;
  height: 100px;
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 80% 1fr;
  & .name {
    position: relative;
    border: 1px solid black;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  & .description {
    position: relative;
    border: 1px solid black;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
  & .amount {
    position: relative;
    border: 1px solid black;
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  & .b-text{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  & .b-text-center{
    @include center;
  }

}

</style>
