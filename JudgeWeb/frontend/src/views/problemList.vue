<template>
<v-card elevation="0">
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-center">문제 번호</th>
      <th class="text-center">문제 이름</th>
      <th class="text-center" v-if="chk && isadmin"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in result" :key="item.title">
      <td>{{item.number}} </td>
      <td><router-link :to='{path:"/problem/" + item.number}'> {{item.title}} </router-link></td>
      <td v-if="chk && isadmin"><v-btn color="deep-purple darken-2" class="white--text" @click="update(item.number)">수정<i class="mdi mdi-pencil"></i></v-btn></td>
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
            result : [],
            chk : false,
            isadmin : false
        };
    },
    async mounted() {
        this.chk = await this.check(1);
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        
        if(this.isadmin){
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
        else {
            this.$http.get('/api/problem/list/public')
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
    },
    methods: {
        update(num) {
            this.$router.push(`update/${num}`);
        }
    }
};
</script>
<style scoped>
</style>