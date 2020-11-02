<template>
  <div class="facility">
    <Facility
      v-for="data in facilities"
      :key="data.name"
      :name="data.name"
      :title="nameToTitle[data.name]"
      :description="nameToDescription[data.name]"
      :suffix="nameToSuffix[data.name]"
    />
  </div>
</template>

<script>
import Facility from '@/components/Facility'

export default {
  components: {
    Facility
  },
  data () {
    return {
      errorLog: '',
      facilities: [],
      nameToTitle: {
        student: '学生',
        '3d-printer': '3Dプリンター',
        'senbei-refining': '鹿せんべい精錬',
        router: 'ルーター',
        'lightning-rod': '避雷針',
        compiler: 'コンパイラー',
        'senbei-chemical-reactor': 'せんべい化学反応炉',
        'graphic-card': 'グラフィックカード'
      },
      nameToDescription: {
        student: '高専の学生が皆さんと一緒に鹿せんべいを作ってくれます',
        '3d-printer': '3Dプリンターで実物の鹿せんべいをコピーします',
        'senbei-refining': '高純度な高専の精錬技術で鹿せんべいを精製します',
        router: 'ルーターを配置し、インターネットから鹿せんべいパケットを取り寄せます',
        'lightning-rod': '雷の電気エネルギーをすべて鹿せんべいに変換します',
        compiler: 'コンパイラソフトにより、ソースコードから実行可能な鹿せんべいを量産します',
        'senbei-chemical-reactor': '最新の物質化学技術により鹿せんべいを作る化学反応を起こします',
        'graphic-card': '浮動小数鹿せんべいを計算して鹿せんべいを大量生産します'
      },
      nameToSuffix: {
        student: '人',
        '3d-printer': '機',
        'senbei-refining': '施設',
        router: '機',
        'lightning-rod': '本',
        compiler: '本',
        'senbei-chemical-reactor': '施設',
        'graphic-card': '台'
      }
    }
  },
  created () {
    this.loadFacilities()
  },
  methods: {
    async loadFacilities () {
      await this.$axios.$get('facility', {
        responseType: 'json'
      })
        .then((response) => {
          this.facilities = response.facilities
          this.facilities.sort((a, b) => a.num_gen - b.num_gen)
        })
        .catch((error) => {
          this.errorLog = error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.facility{
  overflow-y: auto;
}
</style>
