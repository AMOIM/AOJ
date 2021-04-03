<template>
<v-card elevation="0">
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-center">문제 번호</th>
      <th class="text-center">문제 이름</th>
      <th class="text-center" v-if="isAdmin"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in result" :key="item.title">
      <td>{{item.number}} </td>
      <td><router-link :to='{path:"/problem/" + item.number}'> {{item.title}} </router-link></td>
      <td v-if="isAdmin"><v-btn color="deep-purple darken-2" class="white--text" @click="update(item.number)">수정<i class="mdi mdi-pencil"></i></v-btn></td>
    </tr>
    </tbody>
  </template>
  </v-simple-table>
</v-card>
</template>

<script>
import {check} from '@/components/mixins/check';
export default {
    mixins:[check],
    data: function () {
        return {
            result : [],
            isAdmin : false
        };
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin(true);
      
        if(this.isAdmin){
            try {
                const result = await this.$http.get('/api/problem/list');
                this.result = result.data;
            }
            catch (err) {
                this.$log.error(err);
            }
        }
        else {
            try {
                const result = await this.$http.get('/api/problem/list/public');
                this.result = result.data;
            }
            catch (err) {
                this.$log.error(err);
            }
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