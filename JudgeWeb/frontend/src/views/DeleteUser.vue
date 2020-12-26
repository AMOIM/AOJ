<template>
  <v-card elevation="0" max-width="30%">
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
</template>

<script>
export default {
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
        };
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
        }
    }
};
</script>

<style scoped>

</style>