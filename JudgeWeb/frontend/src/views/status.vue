<template>
  <v-simple-table>
  <template v-slot:default>
    <thead>
    <tr>
      <th class="text-left">채점 번호</th>
      <th class="text-left">문제 번호</th>
      <th class="text-left">결과</th>
      <th class="text-left">메모리</th>
      <th class="text-left">시간</th>
      <th class="text-left">언어</th>
      <th class="text-left">제출 시간</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in list" :key="item.name">
      <td>{{ item.number }}</td>
      <td>{{ item.problemNum }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.memory }}</td>
      <td>{{ item.time }}</td>
      <td>{{ item.lang }}</td>
      <td>{{ item.date }}</td>
    </tr>
    </tbody>
  </template>
  </v-simple-table>
</template>

<script>
export default {
    name: 'status.vue',
    data : () => {
        return {
            list : [],
            userName : 'kimcoding' // temp
        };
    },
    mounted() {
        const id = this.$route.params.id;
        if (id === undefined)
            this.$router.go(-1);
        this.$http.post(`/api/contest/status/${id}`, {
            user : this.userName
        })
            .then(result => {
                this.$log.info(result.data);
                this.list = result.data;
            })
            .catch(err => {
                this.$log.error(err);
            });
    }
};
</script>

<style scoped>

</style>