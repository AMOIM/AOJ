<template>
<v-container>
<v-container>
  <v-row>
      <div style="width:12%; font-weight:bold;"><v-col>문제</v-col></div>
      <div style="width:20%; font-weight:bold;"><v-col>시간</v-col></div>
      <div style="width:60%; font-weight:bold;"><v-col>내용</v-col></div>
  </v-row>
  <v-row  v-for="i in notices" :key="i.date">
    <v-col>
      <v-row>
        <div style="width:12%"><v-col>{{ i.problemNum }}</v-col></div>
        <div style="width:20%"><v-col>{{ i.date }}</v-col></div>
        <div style="width:60%"><v-col>{{ i.content }}</v-col></div>
      </v-row>
    </v-col>
  </v-row>
</v-container>
<v-btn class="ma-2" fab dark color="indigo" v-on:click="addNotice.addNoticeFlag=true">
        <v-icon dark>mdi-plus</v-icon>
</v-btn>
<componentNoticeCreate :addNotice="addNotice" @submitNotice="submitNotice"></componentNoticeCreate>
</v-container>
</template>

<script>
import componentNoticeCreate from '../../components/Notice/NoticeCreate';
import axios from 'axios';

export default {
    components: {
        componentNoticeCreate
    },
    data: function() {
        return {
            notices: [{
                date: '',
                problemNum: '',
                content: '',
                child: [{
                    content: '',
                    date: ''
                }],
                _id: ''
            }],
            addNotice: {
                select: {value: '전체', ProblemName: '전체'},
                items: [
                    {value: '전체', ProblemName: '전체'},
                    {value: 'A', ProblemName: 'A'},
                    {value: 'B', ProblemName: 'B'},
                    {value: 'C', ProblemName: 'C'},
                    {value: 'D', ProblemName: 'D'}
                ],
                content: null,
                contentRules: [
                    v => !!v || '공지사항 입력 부탁드립니다!'
                ],
                addNoticeFlag: false,
            }
        };
    },
    created() {
        axios.get('/api/notice/1?key=1').then(res => {
            this.notices = res.data;
        });
    },
    methods: {
        async submitNotice(num) {
            await axios.post('/api/notice/create',
                {
                    competitionNum : 1,
                    isQnA: false,
                    problemNum: num.select.value,
                    content: num.content
                });
            window.location.reload(true);
            this.addNotice.addNoticeFlag = false;
            this.addNotice.content = null;
            this.addNotice.select = {value: '전체', ProblemName: '전체'};
        }
    }
};
</script>