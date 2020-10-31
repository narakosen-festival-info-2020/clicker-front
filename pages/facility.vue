<template>
  <div class="facility">
    <Facility
      v-for="data in facilities"
      :key="data.name"
      :name="data.name"
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
      facilities: []
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
          this.facilities = [...response.facilities]
          this.facilities.sort((a, b) => a.num_gen - b.num_gen)
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
.facility{
  overflow-y: auto;
}
</style>
