<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">시간</th>
          <th class="text-left">문제</th>
          <th class="text-left">내용</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in notices" :key="item.name">
          <td>{{ item.date }}</td>
          <td>{{ item.problemNum }}</td>
          <td>{{ item.content }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            notices: [],
        };
    },
    created() {
        axios.get('/api/notice/1?key=0').then(res => {
            this.notices = res.data;
        });
    }
};
</script>