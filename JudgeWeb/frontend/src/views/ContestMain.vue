<template>
<v-card v-if="this.chk">
  <v-row>
    <v-col style="max-width: 350px;">
      <sidebarComponent style="max-width: 200px;" :data="model"></sidebarComponent>
    </v-col>
    <v-col style="max-width: 700px;">
      <v-simple-table
        fixed-header
        height="500px"
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
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import sidebarComponent from '../components/SideBar';
import {checklogin} from '../components/mixins/checklogin.js';

export default {
    mixins:[checklogin],
    components: {
        sidebarComponent
    },
    data () {
        return {
            chk : false,
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
        this.$http.get('/api/contest/'+this.competitionNum).then(res => {
            this.problems = res.data;
        });
    }
};
</script>
<style>
a {  text-decoration: none;}
.nomargin { padding-right: 0px;}
</style>