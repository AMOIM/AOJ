<template>
<v-card elevation="0" v-if="this.chk">
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-center">문제 번호</th>
      <th class="text-center">문제 이름</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in result" :key="item.title">
      <td>{{item.number}} </td>
      <td><router-link :to='{path:"/problem/" + item.number}'> {{item.title}} </router-link></td>
    </tr>
    </tbody>
  </template>
  </v-simple-table>
</v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';

export default {
    mixins:[checklogin],
    data: function () {
        return {
            chk: false,
            result : []
        };
    },
    async mounted() {
        this.chk = await this.check();
    },
    created() {
        this.$http.get('/api/problem/list')
            .then(
                (response) => {
                    this.result = response.data;
                },
                (error) => { 
                    this.$log.info(3);
                    alert('에러1' + error.response.data.error);
                }
            )
            .catch(error => {
                this.$log.info(4);
                alert('에러2' + error);
            });
    }
};
</script>
<style scoped>
</style>