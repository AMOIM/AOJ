<template>
<v-card elevation="0" v-if="this.chk && this.isadmin" id="contest">
  <div>
    <div><h2>대회 생성</h2></div>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-row>
        <v-col class="margin_right">
          <v-text-field
              v-model="contest.title"
              :counter="40"
              :rules="contest.titleRules"
              label="대회 제목"
              required
          ></v-text-field>

          <v-text-field
              :value="contest.start | moment('YYYY-MM-DD HH:mm:ss')"
              label="대회 시작 시간"
              required
              @click="startShow=true;"
          ></v-text-field>

          <v-text-field
              :value="contest.end | moment('YYYY-MM-DD HH:mm:ss')"
              label="대회 종료 시간"
              required
              @click="endShow=true;"
          ></v-text-field>

          <v-row
              :key="problem.id"
              v-for="(problem, index) in contest.problems"
          >
            <v-col cols="3">
              {{ problem.number }}
            </v-col>
            <v-col cols="7">
                {{ problem.title }}
            </v-col>
            <v-col cols="2">
              <v-icon color="red" @click="deleteProblem(index)">mdi-delete</v-icon>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9">
          <v-text-field v-model="number" @keyup.enter="createProblem(number)" label="문제 번호를 입력하세요."/>
            </v-col>
            <v-col cols="3">
          <v-btn color="deep-purple darken-2" class="white--text" @click="createProblem(number)">문제 등록</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row
              :key="user.id"
              v-for="(user, index) in contest.users"
          >
              <v-col cols="4">
                {{ contest.idList[index] }}
              </v-col>
              <v-col cols="4">
                {{ user }}
              </v-col>
              <v-col cols="3">
                <v-icon color="red" @click="deleteUser(index)">mdi-delete</v-icon>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="9">
                <v-text-field v-model="id" @keyup.enter="createUser(id)" label="참가자 아이디를 입력하세요."/>
              </v-col>
            <v-col cols="3">
              <v-btn color="deep-purple darken-2" class="white--text" @click="createUser(id)">참가자 등록</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-btn style="margin-top : 200px;" color="deep-purple darken-2" dark @click="createContest()">
        대회 생성
        <v-icon right>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-form>

    <DatePicker :show="startShow" :mod=0 @save="save" @close="close"/>
    <DatePicker :show="endShow" :mod=1 @save="save" @close="close"/>
  </div>
  </v-card>
</template>

<script>
import {checklogin} from '@/components/mixins/checklogin';

export default {
    components: {
        DatePicker: () => import('../components/DatePicker'),
    },
    mixins:[checklogin],
    data() {
        return {
            valid: true,
            id: '',
            number: '',
            chk: false,
            isadmin: false,
            contest: {
                start: '',
                end: '',
                title: '',
                titleRules: [
                    v => !!v || '제목을 입력해주세요!',
                    v => v && v.length <= 40 || '제목을 40글자 이내로 작성해주세요!',
                ],
                problems: [],
                idList: [],
                users: []
            },
            startShow: false,
            endShow: false
        };
    },
    async mounted() {
        this.contest.start = new Date();
        this.contest.start.setSeconds(0);
        this.contest.end = new Date(new Date().setHours(new Date().getHours() + 3));
        this.contest.end.setSeconds(0);
        this.chk = await this.check();
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        if(this.chk && this.$store.state.name !== 'admin') {
            this.$router.push('/');
            alert('관리자만 접근이 가능합니다.');
        }
    },
    methods: {
        deleteProblem(index) {
            this.contest.problems.splice(index, 1);
        },
        deleteUser(index) {
            this.contest.users.splice(index, 1);
        },
        async createProblem(number) {
            if (this.number === '') {
                alert('입력 후 등록해주십시오.');
                return;
            }
            await this.$http.post('/api/problem', {
                id: number
            })
                .then(result => {
                    const problem = result.data;
                    if(problem !== null){
                        this.contest.problems.push({
                            number : number,
                            title : problem.title
                        });
                    }
                    else alert('존재하지 않는 문제입니다.');
                })
                .catch(err => this.$log.error(err));
            this.number = '';
        },
        async createUser(id) {
            if (this.id === '') {
                alert('입력 후 등록해주십시오.');
                return;
            }
            await this.$http.post('/api/user', {
                id: id
            })
                .then(result => {
                    const name = result.data.name;
                    if(name !== null){
                        this.contest.users.push(name);
                        this.contest.idList.push(id);
                    }
                    else alert('존재하지 않는 아이디입니다.');
                })
                .catch(err => this.$log.error(err));
            this.id = '';
        },
        createContest() {
            if(this.contest.problems.length === 0 || this.contest.users.length === 0 || this.contest.title === ''){
                alert('정보를 모두 입력하세요.');
                return;
            }

            this.$http.post('/api/contest/create', {
                contest: this.contest
            })
                .then(
                    async (response) => {
                        if (response.data.result === 1) {
                            this.$log.info(1);
                            alert('대회가 개최되었습니다.');
                            this.$router.push('/');
                        } else {
                            this.$log.info(2);
                            alert('대회 개최가 실패하였습니다.');
                        }
                    })
                .catch(error => {
                    alert('대회 제목이 중복됩니다.');
                    this.$log.error('Server error\n' + error);
                });
        },
        save(date, time, mod) {
            const timeStamp = time.split(':');
            if (mod === 0) {
                this.contest.start = new Date(date);
                this.contest.start.setHours(timeStamp[0]);
                this.contest.start.setMinutes(timeStamp[1]);
            } else {
                this.contest.end = new Date(date);
                this.contest.end.setHours(timeStamp[0]);
                this.contest.end.setMinutes(timeStamp[1]);
            }
        },
        close() {
            this.startShow = false;
            this.endShow = false;
        }
    }
};
</script>

<style scoped>
.margin_right {
  margin-right : 50px;
}
</style>