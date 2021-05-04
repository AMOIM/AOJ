<template>
<v-card elevation="0" v-if="this.isLogin">
  <v-row>
    <v-col style="max-width: 500px;">
      <sidebarComponent style="max-width: 300px;"></sidebarComponent>
      <problemSidebarComponent style="max-width: 300px;"></problemSidebarComponent>
    </v-col>
    <v-col style="max-width: 1000px;">
      <v-simple-table v-if="this.openProblems || this.isAdmin">
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
              v-for="(user,index) in userList"
              :key="user">
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
import sidebarComponent from '@/components/sidebar/SideBar';
import problemSidebarComponent from '@/components/sidebar/ProblemSideBar';
import {check} from '@/components/mixins/check';

export default {
    mixins:[check],
    components: {
        sidebarComponent,
        problemSidebarComponent
    },
    data () {
        return {
            userList: [],
            isLogin : false,
            isAdmin : false,
            openProblems : false,
            problems: [],
            competitionNum: '',
        };
    },
    async created() {
        this.competitionNum = this.$route.params.id;

        await this.$http.get('/api/contest/'+this.competitionNum)
            .then(res => {
                this.problems = res.data;
            })
            .catch(() => {
                this.$router.push('/404');
            });

        if(typeof this.problems === 'undefined') return;

        this.openProblems = await this.checkTime(this.competitionNum);
        await this.$http.get('/api/contest/userlist/'+this.competitionNum)
            .then(res => {
                this.userList = res.data;
            })
            .catch(err => this.$log.error(err));
    },
    async mounted() {
        this.isLogin = await this.checkLogin();
        if(this.isLogin === false) return;

        this.isAdmin = await this.checkAdmin(true);
    },
};
</script>
<style>
a {  text-decoration: none;}
</style>