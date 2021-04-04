<template>
<v-container fluid v-if="this.chk && this.isadmin">
    <v-row align="center" justify="center">
  <v-card elevation="0" style="width:600px;">
    <v-alert
        dense
        text
        v-if="sflag"
        type="success"
    >
      {{msg}}
    </v-alert>
    <v-alert
        dense
        text
        v-if="eflag"
        type="error"
    >
      {{msg}}
    </v-alert>
    <DeleteBox :show="show" :user="user" @isAccept="isAccept"/>
    <v-card-title class="text-h4 justify-center">회원 탈퇴</v-card-title>
    <v-card-text class="margin-top-100">
      <v-row>
        <v-col>
      <v-text-field v-model="id" type="text" label="회원 아이디"/>
        </v-col>
        <v-col>
      <v-btn class="deep-purple darken-3 white--text margin-top-100" elevation="10" @click="show = true; user = true;">삭제<v-icon right>mdi-delete</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="contestId" type="text" label="대회 번호"/>
        </v-col>
        <v-col>
          <v-btn class="deep-purple darken-3 white--text margin-top-100" elevation="10" @click="show = true; user = false;">삭제<v-icon right>mdi-delete</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
    </v-row>
    <v-row align="center" justify="center">
  <v-simple-table style="width:600px;" v-if="users.length!==0">
      <thead>
        <tr>
          <th class="text-center">
            아이디
          </th>
          <th class="text-center">
            닉네임
          </th>
          <th class="text-center">
            승인여부
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td v-if="chk && isadmin">
              <v-btn color="purple lighten-4" class="white--text" @click="approve(user.id, user)">승인</v-btn>
              <v-btn color="purple lighten-4" class="white--text" @click="rejection(user.id, user)">거부</v-btn>
          </td>
        </tr>
      </tbody>
  </v-simple-table>
    </v-row>
</v-container>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';
export default {
    mixins:[checklogin],
    components: {
        DeleteBox: () => import('../components/DeleteCheck'),
    },
    name: 'DeleteUser',
    data() {
        return {
            id : '',
            contestId : '',
            error: '',
            msg : '',
            sflag : false,
            eflag : false,
            show : false,
            user : false,
            users : [],
            chk : false,
            isadmin : false,
            deletedIndex: '',
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
    async created() {
        try {
            const result = await this.$http.get('/api/user/check');
            this.users = result.data;
        } catch (err) {
            this.$log.error(err);
        }
    },
    methods :{
        async remove(){
            await this.$http.delete('/api/user/delete', {
                data : {
                    id : this.id
                }
            })
                .then(result=>{
                    if(result.data){
                        this.sflag = true;
                        this.eflag = false;
                        this.msg = '회원 탈퇴 완료!!';
                    }
                    else {
                        this.sflag = false;
                        this.eflag = true;
                        this.msg = '회원 아이디를 확인해주세요.';
                    }
                })
                .catch(()=>{
                    this.sflag = false;
                    this.eflag = true;
                    this.msg = '죄송합니다. 서버 에러입니다. 개발자에게 문의해주세요!';
                });
        },
        async removeContestUser(){
            await this.$http.delete('/api/user/delete/contest', {
                data : {
                    id : this.contestId
                }
            })
                .then(result=>{
                    if(result.data){
                        this.sflag = true;
                        this.eflag = false;
                        this.msg = '대회 참가자 탈퇴 완료!!';
                    }
                    else {
                        this.sflag = false;
                        this.eflag = true;
                        this.msg = '대회 번호를 확인해주세요.';
                    }
                })
                .catch(()=>{
                    this.sflag = false;
                    this.eflag = true;
                    this.msg = '죄송합니다. 서버 에러입니다. 개발자에게 문의해주세요!';
                });
        },
        isAccept(yes){
            this.show = false;
            if(yes) {
                if (this.user) this.remove();
                else this.removeContestUser();
            }
        },
        async approve(id, index) {
            try {
                const result = await this.$http.patch('/api/user/approve', {
                    id : id
                });
                if(result.data) {
                    this.deletedIndex = this.users.indexOf(index);
                    this.users.splice(this.deletedIndex, 1);
                }
            } catch (err) {
                this.$log.error(err);
            }
        },
        async rejection(id, index) {
            try {
                const result = await this.$http.delete('/api/user/delete', {
                    data : {
                        id : id
                    }
                });
                if(result.data) {
                    this.deletedIndex = this.users.indexOf(index);
                    this.users.splice(this.deletedIndex, 1);
                }
            } catch (err) {
                this.$log.error(err);
            }
        }
    }
};
</script>

<style scoped>

</style>