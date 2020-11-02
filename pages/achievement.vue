<template>
  <div class="achievement">
    <div class="achievement-box-wrap">
      <Achievement
        v-for="data in achievements"
        :id="data.id"
        :key="data.name"
        :unlocked="data.unlocked"
        :name="data.title"
        :description="nameToDescription[data.prefix]"
      />
    </div>
  </div>
</template>

<script>
import Achievement from '@/components/Achievement'

export default {
  components: {
    Achievement
  },
  data () {
    return {
      errorLog: '',
      achievements: [],
      nameToTitle: {
        router: 'ルーター所持数',
        'click-senbei': 'クリック生産量',
        'lightning-rod': '避雷針所持数',
        'graphic-card': 'グラフィックカード所持数',
        'unique-user': '累計来訪者数',
        '3d-printer': '3Dプリンター所持数',
        'senbei-chemical-reactor': 'せんべい化学反応炉所持数',
        'total-senbei': '総鹿せんべい生産量',
        'senbei-refining': '鹿せんべい精錬所持数',
        student: '学生所持数',
        sps: '秒間生産量',
        compiler: 'コンパイラー所持数'
      },
      nameToDescription: {
        router: 'ルーター所持数',
        'click-senbei': 'クリック生産量',
        'lightning-rod': '避雷針所持数',
        'graphic-card': 'グラフィックカード所持数',
        'unique-user': '累計来訪者数',
        '3d-printer': '3Dプリンター所持数',
        'senbei-chemical-reactor': 'せんべい化学反応炉所持数',
        'total-senbei': '総鹿せんべい生産量',
        'senbei-refining': '鹿せんべい精錬所持数',
        student: '学生所持数',
        sps: '秒間生産量',
        compiler: 'コンパイラー所持数'
      },
      nameToIsPow: {
        router: false,
        'click-senbei': true,
        'lightning-rod': false,
        'graphic-card': false,
        'unique-user': false,
        '3d-printer': false,
        'senbei-chemical-reactor': false,
        'total-senbei': true,
        'senbei-refining': false,
        student: false,
        sps: true,
        compiler: false
      }
    }
  },
  created () {
    this.loadAchievements()
  },
  methods: {
    async loadAchievements () {
      await this.$axios.$get('achievements', {
        responseType: 'json'
      })
        .then((response) => {
          this.achievements = response.achievements
          this.achievements.map((e) => {
            const prefix = e.name.split('-').slice(0, -1).join('-')
            let suffix = e.name.split('-').slice(-1)
            if (this.nameToIsPow[prefix]) {
              if (suffix > 0) {
                suffix = '1e+' + suffix
              } else {
                suffix = '1'
              }
            }
            e.prefix = prefix
            e.suffix = suffix
            e.title = this.nameToTitle[prefix] + ':' + suffix
          })
        })
        .catch((error) => {
          this.errorLog = error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.achievement{
  width: 100%;
  overflow-y: scroll;
  .achievement-box-wrap{
    margin: 0 auto;
    width: min(100%, 1300px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
  }
}
</style>
