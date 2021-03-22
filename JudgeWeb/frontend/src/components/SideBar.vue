<template>
<v-container>
  <v-card
    class="mb-6 no-gutters"
    max-width="500"
    outlined
  >
    <v-list>
      <v-list-item-group
        color="#5E35B1">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.path + competitionNum"
        >
          <v-list-item-content>
            <v-list-item-title style='color: #311B92;' v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    text: '메인',
                    path: '/contest/'
                },
                {
                    text: '스코어보드',
                    path: '/contest/scoreboard/'
                },
                {
                    text: '채점 현황',
                    path: '/contest/status/'
                },
                {
                    text: '공지사항',
                    path: '/contest/notice/'
                },
                {
                    text: '질문',
                    path: '/contest/qna/'
                },
            ],
            competitionNum: 0,
        };
    },
    created () {
        this.competitionNum = this.$route.params.id;
    }
};
</script>
<style>
a {  text-decoration: none;}
</style>