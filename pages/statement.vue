<template>
  <div class="statement">
    <Statement :statements="statements.general" :title="'全体'" />
    <Statement :statements="statements.click" :title="'クリック関連'" />
  </div>
</template>

<script>
import Statement from '@/components/Statement'
export default {
  components: { Statement },
  data () {
    return {
      errorLog: '',
      statements: {
        general: [
          // order は配列の順番を指定する
          // バックエンドで配列の順番を決められるなら order は消す
          {
            order: 0,
            name: 'totalCount',
            subtitle: 'これまでの鹿せんべい生産量',
            value: 0
          },
          {
            order: 10,
            name: 'nowCount',
            subtitle: '現在の鹿せんべい所持数  ',
            value: 0
          },
          {
            order: 20,
            name: 'totalUsers',
            subtitle: 'これまでの来訪者数',
            value: 0
          },
          {
            order: 30,
            name: 'nowUsers',
            subtitle: '現在の来訪者数',
            value: 0
          }
        ],
        click: [
          {
            order: 0,
            name: 'totalClick',
            subtitle: 'これまでのクリック数',
            value: 0
          },
          {
            order: 10,
            name: 'totalClickGen',
            subtitle: 'これまでのクリックによる生産数',
            value: 0
          }
        ]
      }
    }
  },
  created () {
    this.loadStatement()
  },
  methods: {
    async loadStatement () {
      await this.$axios.$get('/api/statement', {
        responseType: 'json'
      })
        .then((response) => {
          this.statements = response
        })
        .catch((error) => {
          // エラー表示を無理やり
          // TODO何かしらで書き換える
          this.errorLog = error
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
