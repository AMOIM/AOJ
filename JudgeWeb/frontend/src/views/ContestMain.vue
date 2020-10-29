<template>
<v-container>
  <v-simple-table
    fixed-header
    height="500px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
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
</v-container>
</template>

<script>
export default {
    data () {
        return {
            problems: [],
            //competitionNum: '',
        };
    },
    async created () {
        //this.competitionNum = 
        this.$http.get('/api/contest/1').then(res => {
            this.problems = res.data;
        });
    }
};
</script>
<style>
a {  text-decoration: none;}
</style>