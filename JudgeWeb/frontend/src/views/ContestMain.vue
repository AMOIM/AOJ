<template>
<v-card elevation="0" v-if="this.chk">
  <v-row>
    <v-col style="max-width: 500px;">
      <sidebarComponent style="max-width: 300px;" :data="model"></sidebarComponent>
      <sidebarComponent2 v-if="this.openProblems" style="max-width: 300px;" :data="model"></sidebarComponent2>
    </v-col>
    <v-col style="max-width: 1000px;">
      <v-simple-table
        v-if="this.openProblems"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center" style="width: 100px;">
                <b><h3>번호</h3></b>
              </th>
              <th class="text-center">
                <b><h3>제목</h3></b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in problems"
              :key="p.number"
              >
              <td>{{p.alphabet}}</td>
              <td><router-link :to="{ path:'/problem/'+p.number}">{{ p.title }}</router-link></td>
            </tr>
          </tbody>
          <div style = 'height: 200px'></div>
        </template>
      </v-simple-table>
    
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center" style="width: 100px;">
                <b><h3>번호</h3></b>
              </th>
              <th class="text-center">
                <b><h3>참가자</h3></b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user,index) in contest.userList"
              :key="user.id">
              <td>{{index + 1}}</td>
              <td>{{ user }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import sidebarComponent from '../components/SideBar';
import sidebarComponent2 from '../components/SideBar2';
import {checklogin} from '../components/mixins/checklogin.js';
import {checktime} from '../components/mixins/checktime.js';

export default {
    mixins:[checklogin, checktime],
    components: {
        sidebarComponent,
        sidebarComponent2
    },
    data () {
        return {
            contest: [],
            now : new Date(),
            start : new Date(),
            chk : false,
            openProblems : false,
            problems: [],
            competitionNum: '',
            model: 0,
        };
    },
    async mounted() {
        this.chk = await this.check();
    },
    async created () {
        this.competitionNum = this.$route.params.id;
        this.openProblems = await this.checktime(this.competitionNum);
        await this.$http.get('/api/contest/'+this.competitionNum).then(res => {
            this.problems = res.data;
        });
        await this.$http.get('/api/contest/userlist/'+this.competitionNum).then(res => {
            this.contest = res.data;
            this.start = new Date(this.contest.start);
        });
    }
};
</script>
<style>
a {  text-decoration: none;}
.nomargin { padding-right: 0px;}
</style>