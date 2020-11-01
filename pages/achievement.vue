<template>
  <div class="achievement">
    <div class="achievement-box-wrap">
      <Achievement
        v-for="data in achievements"
        :id="data.id"
        :key="data.name"
        :unlocked="data.unlocked"
        :name="data.name"
        :description="data.description"
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
      achievements: []
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
            e.description = '実績ですよ！１！実実実実実実実績実実績実績実績実実績実実実績績績績績績績績績績績実績'
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
