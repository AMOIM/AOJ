<template>
  <v-card v-if="this.chk && this.isadmin" id="contest">
    <div> <h2>Create Contest</h2> </div>
    <div> 대회 제목 : <input v-model="contest.title" placeholder="대회 제목을 입력하세요."> </div>
    <div> 대회 시작 시각 : <input v-model="contest.start" placeholder="ex) 2020.09.09.17.00"></div>
    <div> 대회 종료 시각 : <input v-model="contest.end" placeholder="ex) 2020.09.09.20.00"></div>
    <li v-for="(problem, index) in contest.problems" :key="problem"> {{problem}}
        <button v-on:click="deleteproblem(index)"> 삭제 </button>
    </li>
    <input type="text" placeholder="문제 번호를 입력하세요." v-model="number"
    v-on:keyup.enter="createproblem(number)">
    <button v-on:click="createproblem(number)">문제 등록</button> <br/>
     <li v-for="(user, index) in contest.users" :key="user"> {{user}} 
         <button v-on:click="deleteuser(index)"> 삭제 </button>
     </li>
       <input type="text" placeholder="참가자 아이디를 입력하세요." v-model="name"
    v-on:keyup.enter="createuser(name)">
    <button v-on:click="createuser(name)"> 참가자 등록</button> <br/>
    <button v-on:click="createcontest()" >대회 생성</button>
  </v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';

export default {
    mixins:[checklogin],
    data: function () {
        return {
            chk: false,
            isadmin: false,
            name : '',
            number : '',
            contest: {
                start: '',
                end: '',
                title: '',
                problems: [],
                users: []
            }
        };
    },
    async mounted() {
        this.chk = await this.check();
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        if(this.chk && this.$store.state.name !== 'admin') {
            this.$router.push('/');
            alert('관리자만 접근이 가능합니다.');
        }
    },
    methods: {
        deleteproblem(index) {
            this.contest.problems.splice(index,1);
        },
        deleteuser(index) {
            this.contest.users.splice(index,1);
        },
        createproblem(number) {
            if(this.number === '') {
                alert('입력 후 등록해주십시오.');
                return;
            }
            this.contest.problems.push(number);
            this.number='';
        },
        createuser(name) {
            if(this.name === '') {
                alert('입력 후 등록해주십시오.');
                return;
            }
            this.$log.info(name);
            this.contest.users.push(name);
            this.name='';
        },
        createcontest() {
            this.$http.post('/api/contest/create', {
                contest: this.contest
            })
                .then((response) => {
                    if(response.data.result === 1) {
                        this.$log.info(1);
                        alert('대회가 개최되었습니다.');
                        this.$router.push('/');
                    }
                    else {
                        this.$log.info(2);
                        alert('대회 개최가 실패하였습니다.');
                    }
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
    }
};
</script>