<template>
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-center">대회 번호</th>
      <th class="text-center">대회 제목</th>
      <th class="text-center">대회 시작 시각</th>
      <th class="text-center">대회 종료 시각</th>
      <th class="text-center" v-if="isAdmin"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in result" :key="item.number">
      <td>{{item.number}}</td>
      <td><router-link :to='{path:"/contest/" + item.number}'> {{item.title}} </router-link></td>
      <td>{{ item.start | moment('YYYY-MM-DD HH:mm:ss') }}</td>
      <td>{{ item.end | moment('YYYY-MM-DD HH:mm:ss') }}</td>
      <td v-if="isAdmin"><v-btn color="deep-purple darken-2" class="white--text" @click="update(item.number)">수정<i class="mdi mdi-pencil"></i></v-btn></td>
    </tr>
    </tbody>
  </template>
  </v-simple-table>
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
    },
    created() {
        this.$http.get('/api/contest/list')
            .then(
                (response) => {
                    this.result = response.data;
                }
            )
            .catch(error => {
                this.$log.error(error);
            });
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