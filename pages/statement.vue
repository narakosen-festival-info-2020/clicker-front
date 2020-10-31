<template>
  <div class="statement">
    <div class="section">
      <Statement :statements="statements.general" :title="'全体'" class="subsection" />
      <Statement :statements="statements.click" :title="'クリック関連'" class="subsection" />
    </div>
  </div>
</template>

<script>
import Statement from '@/components/Statement'
export default {
  components: { Statement },
  data () {
    return {
      statements: {
        general: [],
        click: []
      },
      nameToSubtitle: {
        total_count: 'これまでの鹿せんべい生産量',
        now_count: '現在の鹿せんべい所持数  ',
        now_sps: 'げんざいの秒間生産量',
        total_users: 'これまでの来訪者数',
        now_users: '現在の来訪者数',
        total_click: 'これまでのクリック数',
        total_click_gen: 'これまでのクリックによる生産数',
        now_spc: '現在の1クリックあたりの生産数'
      }
    }
  },
  created () {
    this.loadStatement()
  },
  methods: {
    async loadStatement () {
      await this.$axios.$get('/statements', {
        responseType: 'json'
      })
        .then((response) => {
          this.statements = response.statements
          this.statements.general.map((e) => {
            e.subtitle = this.nameToSubtitle[e.name]
          })
          this.statements.click.map((e) => {
            e.subtitle = this.nameToSubtitle[e.name]
          })
        })
        .catch((error) => {
          // エラー表示を無理やり
          // TODO何かしらで書き換える
          this.statement.general[0].value = error
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.statement{
  overflow-y: auto;
}

</style>
