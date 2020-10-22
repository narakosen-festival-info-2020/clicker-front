<template>
  <div class="building">
    <div v-for="building in $parent.buildings" :key="building.name" class="buildingDisplay" @click.prevent="buy(building.name)">
      <div class="name">
        <span class="b-text">{{ building.name }}</span>
      </div>
      <div class="description">
        <span class="b-text">価格{{ building.amount }}：生産量：{{ building.num_gen }}</span>
      </div>
      <div class="amount">
        <span class="b-text-center">{{ building.num_hold }}台</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Building',
  methods: {
    buy (component) {
      this.$emit('buy', component)
    }
  }
}
</script>

<style lang="scss" scoped>
.building{
  overflow-y: auto;
}

.buildingDisplay{
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
