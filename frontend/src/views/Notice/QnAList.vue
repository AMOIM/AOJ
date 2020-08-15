<template>
  <table>
      <thead style="text-align:left;">
        <tr>
          <th style="width:13%">문제</th>
          <th style="width:23%">시간</th>
          <th style="width:64%">내용</th>
        </tr>
      </thead>
      <tbody v-for="i in notices" :key="i.date">
        <tr>
          <td>{{ i.problemNum }}</td>
          <td>{{ i.date }}</td>
          <td>{{ i.content }}</td>
        </tr>
        <tr v-if="i.child.content !== 'null'">
          <td><v-icon class="fa fa-reply fa-rotate-180" aria-hidden="true"></v-icon></td>
          <td>{{ i.child.date }}</td>
          <td>{{ i.child.content }}</td>
        </tr>
      </tbody>
  </table>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            notices: [{
                date: '',
                problemNum: '',
                content: '',
                child: [{
                    content: '',
                    date: ''
                }]
            }],
        };
    },
    created() {
        axios.get('/api/notice/1?key=0').then(res => {
            this.notices = res.data;
        });
    }
};
</script>

<style>
table {
  border-collapse: separate;
  border-spacing: 0 17px;
}
</style>