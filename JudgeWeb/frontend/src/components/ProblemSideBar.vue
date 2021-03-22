<template>
<v-container>
    <v-card
    v-if="this.openProblems"
    class="mb-6 no-gutters"
    max-width="500"
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
          <v-list-item-content style="text-align:left; padding: 0;">
              <v-row>
                  <v-col style='max-width:40px;color: #311B92;'>{{item.alphabet}}</v-col>
                  <v-col style='overflow: hidden'><v-list-item-title v-text="item.title" style='color: #9575CD;'></v-list-item-title></v-col>
              </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</v-container>
</template>
<script>
import {checktime} from '../components/mixins/checktime.js';
export default {
    mixins:[checktime],
    data() {
        return {
            problems: {
                problem: [],
                path: '/problem/'
            },
            competitionNum: 0,
            openProblems : false
        };
    },
    async created () {
        this.competitionNum = this.$route.params.id;
        this.$http.get('/api/contest/'+this.competitionNum).then(res => {
            this.problems.problem = res.data;
        });
        this.openProblems = await this.checktime(this.competitionNum);
    }
};
</script>
<style>
a {  text-decoration: none;}
</style>