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
    <tr v-for="item in problemList" :key="item.title">
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
            problemList : [],
            isAdmin : false
        };
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin(true);

        try {
            const url = this.isAdmin ? '/api/problem/list' : '/api/problem/list/public';
            const result = await this.$http.get(url);
            this.problemList = result.data;
        }
        catch (err) {
            this.$log.error(err);
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