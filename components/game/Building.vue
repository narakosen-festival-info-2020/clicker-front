<template>
  <div class="building">
    <div v-for="building in buildings" :key="building.name" class="buildingDisplay">
      <h2>{{ building.name }}</h2>
      <p>{{ building.description }}</p>
      <h3>{{ building.amount }}台</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Building',
  data () {
    return {
      buildings: [
        {
          name: '学生',
          description: '皆さんの代わりに高専の学生が5秒に一度クリックしてくれます',
          amount: 113
        },
        {
          name: '3Dプリンター',
          description: '3Dプリンターを用いて生産します',
          amount: 90
        },
        {
          name: 'せんべい精錬',
          description: '溶かした材料を精錬して生産します',
          amount: 73
        },
        {
          name: '避雷針',
          description: '雷の電気エネルギーを利用してせんべいを錬成します',
          amount: 36
        },
        {
          name: 'ルーター',
          description: 'インターネットからパケットせんべいを取り寄せます',
          amount: 17
        },
        {
          name: 'コンパイラー',
          description: 'ソースコードをコンパイルして実行可能なせんべいを生成します',
          amount: 17
        }
      ]
    }
  },
  methods: {
    buy (cost) {
      this.$emit('buy', cost)
    }
  }
}
</script>

<style lang="scss" scoped>
.building{
  overflow-y: scroll;
}

.buildingDisplay{
  cursor: pointer;
  float: right;
  margin-top: 12px;
  width: 70vw;
  height: 120px;
  background: #ddddce;
}

</style>
