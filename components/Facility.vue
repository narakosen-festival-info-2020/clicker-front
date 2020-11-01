<template>
  <div class="facility-display" @click="buy">
    <div class="name">
      <span class="b-text">{{ name }}</span>
    </div>
    <div class="description">
      <span class="b-text">
        <span class="text">価格 : {{ representTransform(amount) }}</span>
        <span class="text">生産量：{{ representTransform(num_gen, 1) }}</span>
      </span>
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
      errorLog: '',
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
      this.ip = await this.$axios.$post(`facility/${this.name}`)
        .catch((error) => {
          this.errorLog = error
        })
      await this.loadFacility()
    },
    async loadFacility () {
      await this.$axios.$get(`facility/${this.name}`, {
        responseType: 'json'
      })
        .then((response) => {
          this.amount = response.amount
          this.num_hold = response.num_hold
          this.num_gen = response.num_gen
        })
        .catch((error) => {
          this.errorLog = error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.facility-display{
  cursor: pointer;
  margin: 12px auto;
  background: #ddddce;
  width: 70%;
  height: 100px;
  border: 5px ridge rgb(85, 24, 0);
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 80% 1fr;
  @include sp{
    width: 90%;
    grid-template-columns: 75% 1fr;
  }
  .name {
    font-weight: 900;
    position: relative;
    border: 1px solid black;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  .description {
    position: relative;
    border: 1px solid black;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    & .text{
      display: inline-block;
    }
  }
  .amount {
    position: relative;
    border: 1px solid black;
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  .b-text{
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
  }

  .b-text-center{
    @include center;
    text-align: center;
    width: 100%;
  }

}

</style>
