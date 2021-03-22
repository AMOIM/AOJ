<template>
<v-card elevation="0" v-if="this.chk && this.isadmin && this.chk3" id="contest">
  <div>
    <div><h2>대회 수정</h2></div>
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
              :rules="titleRules"
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
              v-for="(problem, index) in contest.problemList"
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
              :key="user"
              v-for="(user, index) in contest.userList"
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

      <v-btn style="margin-top : 200px; margin-right : 10px;" color="deep-purple darken-2" dark @click="updateContest()">
        대회 수정<i class="mdi mdi-pencil"></i>
      </v-btn>
      <v-btn style="margin-top : 200px; margin-left : 10px;" color="red accent-3" dark @click="deleteContest()">
        대회 삭제<i class="mdi mdi-delete"></i>
      </v-btn>
    </v-form>

    <DatePicker :show="startShow" :mod=0 @save="save" @close="close"/>
    <DatePicker :show="endShow" :mod=1 @save="save" @close="close"/>
  </div>
  </v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';

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
            chk3: false,
            isadmin: false,
            contest: {
                start: '',
                end: '',
                title: '',
                userList: [],
                idList: [],
                problemList: []
            },
            titleRules: [
                v => !!v || '제목을 입력해주세요!',
                v => v && v.length <= 40 || '제목을 40글자 이내로 작성해주세요!',
            ],
            startShow: false,
            endShow: false
        };
    },
    async mounted() {
        this.chk = await this.check();
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        if(this.chk && this.$store.state.name !== 'admin') {
            this.$router.push('/');
            alert('관리자만 접근이 가능합니다.');
        }
        await this.$http.get(`/api/contest/userlist/${this.$route.params.id}`)
            .then(
                async (response) => {
                    const contest = response.data;
                    let problems = new Array;
                    for(let num of contest.problemNum) {
                        await this.$http.post('/api/problem', {
                            id: num
                        })
                            .then(result => {
                                const problem = result.data;
                                problems.push({
                                    number : num,
                                    title : problem.title
                                });
                            })
                            .catch(err => this.$log.error(err));
                    }
                    contest.problemList = problems;
                    this.contest = contest;
                }
            )
            .catch(error => {
                this.$log.info(error);
            });

        this.chk3=true;
    },
    methods: {
        async updateContest() {
            await this.$http.put('/api/contest/update', { contest : this.contest })
                .then(
                    (response) => {
                        alert('대회수정이 완료되었습니다.');
                        this.$log.info(response.data);
                        this.$router.push('/contest/list');
                    }
                )
                .catch(error => {
                    alert('대회 제목이 중복됩니다!');
                    this.$log.error(error);
                });
        },
        deleteContest() {
            this.$http.delete(`/api/contest/delete/${this.contest.number}`)
                .then(
                    (response) => {
                        alert('대회가 삭제되었습니다.');
                        this.$log.info(response.data);
                        this.$router.push('/contest/list');
                    }
                )
                .catch(error => {
                    this.$log.info(error);
                });
        },
        deleteProblem(index) {
            this.contest.problemList.splice(index, 1);
        },
        deleteUser(index) {
            this.contest.userList.splice(index, 1);
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
                        this.contest.userList.push(name);
                        this.contest.idList.push(id);
                    }
                    else alert('존재하지 않는 아이디입니다.');
                })
                .catch(err => this.$log.error(err));
            this.id = '';
        },
        async createContest() {
            if(this.contest.problemList.length === 0 || this.contest.userList.length === 0 || this.contest.title === ''){
                alert('정보를 모두 입력하세요.');
                return;
            }

            await this.$http.post('/api/contest/create', {
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