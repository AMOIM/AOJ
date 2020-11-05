<template>
<v-container>
<v-container>
  <v-card
    class="mb-6 no-gutters"
    max-width="130"
    outlined
  >
    <v-list>
      <v-list-item-group
        v-model="model"
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
<v-container>
    <v-card
    class="mb-6 no-gutters"
    max-width="130"
    outlined
  >
    <v-list>
      <v-list-item-group
        color="#5E35B1">
        <v-list-item
          v-for="(item, i) in problems.problem"
          :key="i"
          :to="problems.path + item.number"
        >
          <v-list-item-content style="padding: 0;">
              <v-row>
                  <v-col style='color: #311B92;'>{{item.alphabet}}</v-col>
                  <v-col><v-list-item-title v-text="item.title" style='color: #9575CD;'></v-list-item-title></v-col>
              </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</v-container>
</v-container>
</template>

<script>
export default {
    props: ['data'],
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
            problems: {
                problem: [],
                path: '/problem/'
            },
            model: this.data,
            competitionNum: 0,
        };
    },
    created () {
        this.competitionNum = this.$route.params.id;
        this.$http.get('/api/contest/'+this.competitionNum).then(res => {
            this.problems.problem = res.data;
        });
    }
};
</script>
<style>
a {  text-decoration: none;}
</style>