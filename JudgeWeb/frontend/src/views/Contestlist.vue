<template>
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-center">대회 제목</th>
      <th class="text-center">대회 시작 시각</th>
      <th class="text-center">대회 종료 시각</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in result" :key="item.name">
      <td><router-link :to='{path:"/contest/" + item.number}'> {{item.title}} </router-link></td>
      <td>{{ item.start | moment('YYYY-MM-DD HH:mm:ss') }}</td>
      <td>{{ item.end | moment('YYYY-MM-DD HH:mm:ss') }}</td>
    </tr>
    </tbody>
  </template>
  </v-simple-table>
</template>

<script>
export default {
    data: function () {
        return {
            result : []
        };
    },
    created() {
        this.$http.get('/api/contest/list')
            .then(
                (response) => {
                    this.result = response.data;
                    this.$log.info(response.data);
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