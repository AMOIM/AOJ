<template>
<v-card elevation="0" v-if="this.isParticipant || this.isAdmin">
<v-row>
<v-col style="max-width: 500px;">
    <sidebarComponent style="max-width: 300px;"></sidebarComponent>
    <problemSidebarComponent style="max-width: 300px;"></problemSidebarComponent>
</v-col>
<v-col style="max-width: 700px;">
<v-container>
  <v-row class="show-text">
      <div style="width:12%; font-weight:bold;"><v-col>문제</v-col></div>
      <div style="width:35%; font-weight:bold;"><v-col>시간</v-col></div>
      <div style="width:50%; font-weight:bold;"><v-col>내용</v-col></div>
  </v-row>
  <v-row  v-for="i in notices" :key="i.date">
    <v-col>
      <v-row class="show-text">
        <div style="width:12%"><v-col>{{ i.problemNum }}</v-col></div>
        <div style="width:35%"><v-col>{{ i.date }}</v-col></div>
        <div style="width:50%; white-space:pre-line;"><v-col>{{ i.content }}</v-col></div>
        <div style="width:8%" v-if="i.child.content==null"><v-col>
            <v-btn class="ma-2" fab dark small color="purple darken-2" v-if="isAdmin && isValid" v-on:click="addReply.addReplyFlag=true, addReply.number=i._id">
                <v-icon>mdi-pencil</v-icon>
            </v-btn></v-col>
        </div>
      </v-row>
      <v-row class="show-text" v-if="i.child.content !== null">
        <div style="width:12%"><v-col><v-icon class="fa fa-reply fa-rotate-180" aria-hidden="true"></v-icon></v-col></div>
        <div style="width:35%"><v-col>{{ i.child.date }}</v-col></div>
        <div style="width:50%; white-space:pre-line;"><v-col>{{ i.child.content }}</v-col></div>
      </v-row>
    </v-col>
  </v-row>
</v-container>
<v-btn class="ma-2" fab dark color="indigo" v-if="isValid" v-on:click="addNotice.addNoticeFlag=true">
        <v-icon dark>mdi-plus</v-icon>
</v-btn>
<componentNoticeCreate :addNotice="addNotice" @submitNotice="submitNotice"></componentNoticeCreate>
<componentReplyCreate :addReply="addReply" @submitReply="submitReply"></componentReplyCreate>
</v-col>
</v-row>
</v-card>
</template>

<script>
import componentNoticeCreate from '@/components/notice/NoticeCreate';
import componentReplyCreate from '@/components/notice/ReplyCreate';
import sidebarComponent from '@/components/sidebar/SideBar';
import problemSidebarComponent from '@/components/sidebar/ProblemSideBar';
import {check} from '@/components/mixins/check';
import moment from 'moment';

export default {
    mixins:[check],
    components: {
        componentNoticeCreate,
        componentReplyCreate,
        sidebarComponent,
        problemSidebarComponent
    },
    data: function() {
        return {
            isParticipant: false,
            isAdmin: false,
            competitionNum: '',
            notices: [{
                date: '',
                problemNum: '',
                content: '',
                child: [{
                    content: '',
                    date: ''
                }],
                _id: '',
            }],
            addNotice: {
                select: {value: '전체', ProblemName: '전체'},
                items: [
                    {value: '전체', ProblemName: '전체'},
                ],
                content: null,
                contentRules: [
                    v => !!v || '질문내용 입력 부탁드립니다!'
                ],
                addNoticeFlag: false,
                type: '질문',
            },
            addReply: {
                addReplyFlag: false,
                content: null,
                number: '',
                contentRules: [
                    v => !!v || '답글내용 입력 부탁드립니다!'
                ],
            },
            problemList: [],
            isValid: true,
        };
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin();
        if(this.isAdmin === false)
            this.isParticipant = await this.checkParticipant(this.$route.params.id);

        try {
            const result = await this.$http.get(`/api/contest/gettime/${this.competitionNum}`);
            const currentTime = Date.now();
            const contestStart = Date.parse(result.data.start);
            const contestEnd = Date.parse(result.data.end);
            if(contestEnd < currentTime || currentTime < contestStart) this.isValid = false;
        } catch (err) {
            this.$log.error(err);
        }
    },
    async created() {
        this.competitionNum = this.$route.params.id;
        try {
            let result = await this.$http.get(`/api/contest/notice?competitionNum=${this.competitionNum}&key=0`);
            this.notices = result.data;
            for(let notice of this.notices) {
                notice.date = moment(notice.date).format('YYYY-MM-DD HH:mm:ss');
            }
            try {
                result = await this.$http.get(`/api/contest/${this.competitionNum}`);
                this.problemList = result.data;
                for(let problem of this.problemList) {
                    await this.addNotice.items.push({value: problem.alphabet, problemName: problem.alphabet});
                }
            } catch (err) {
                this.$log.error(err);
            }
        } catch (err) {
            this.$log.error(err);
        }
    },
    methods: {
        async submitNotice(num) {
            await this.$http.post('/api/contest/notice/post',
                {
                    competitionNum : this.competitionNum,
                    isQnA: true,
                    problemNum: num.select.value,
                    content: num.content
                });
            window.location.reload(true);
            this.addNotice.addNoticeFlag = false;
            this.addNotice.content = null;
            this.addNotice.select = {value: '전체', ProblemName: '전체'};
        },
        async submitReply(num) {
            await this.$http.post('/api/contest/notice/reply',
                {
                    competitionNum : this.competitionNum,
                    _id: num.number,
                    content: num.content
                });
            window.location.reload(true);
            this.addReply.addReplyFlag = false;
            this.addReply.content = null;
        }
    }
};
</script>

<style>
.show-text {
    text-align: left;
}
</style>