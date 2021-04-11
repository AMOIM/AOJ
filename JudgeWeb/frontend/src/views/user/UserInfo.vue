<template>
  <v-card elevation="0" max-width="30%">
    <v-alert
      dense
      text
      v-if="successFlag"
      type="success"
    >
    {{msg}}
    </v-alert>
    <v-alert
        dense
        text
        v-if="errorFlag"
        type="error"
    >
      {{msg}}
    </v-alert>
    <v-card-title class="text-h4 justify-center">개인 정보</v-card-title>
    <v-card-text class="margin-top-100">
      <v-text-field v-model="user.id" type="text" label="아이디" readonly/>
      <v-text-field v-model="user.name" type="text" label="닉네임" readonly/>
      <v-text-field v-model="password" type="password"  label="비밀번호" :rules="pwRules"/>
      <v-text-field
          v-model="changePW"
          type="password"
          label="변경할 비밀번호"
          @change="checkPassword()"
          :rules="pwRules"
      />
      <v-text-field
          v-model="confirmPW"
          type="password"
          label="변경할 비밀번호 확인"
          @change="checkPassword()"
          :rules="pwRules"
          :error-messages="error"/>
      <v-btn class="deep-purple darken-3 white--text margin-top-100" elevation="10" v-on:click="update">수정<v-icon right>mdi-pencil</v-icon></v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'User.vue',
    data() {
        return {
            user : [],
            password : '',
            changePW : '',
            confirmPW : '',
            error: '',
            msg : '',
            successFlag : false,
            errorFlag : false,
            pwRules: [
                v => !!v || '비밀번호를 입력해주세요!',
                v => v && v.length <= 20 || '비밀번호를 20자 이내로 입력하세요!',
            ],
        };
    },
    async created(){
        await this.$http.post('/api/user', {
            id : this.$store.state.id
        })
            .then(result => {
                this.user = result.data;
            })
            .catch(err=>{
                this.$log.error(err);
            });
    },
    methods : {
        checkPassword() {
            if(this.changePW !== this.confirmPW) {
                this.error='비밀번호가 일치하지 않습니다.';
            }
            else {
                this.error='';
            }
        },
        update(){
            if(this.error !== '') {
                this.errorFlag = true;
                this.successFlag = false;
                this.msg = '비밀번호를 확인해주세요.';
                return;
            }
            this.$http.put('/api/user/update', {
                id : this.user.id,
                password : this.password,
                changePW : this.changePW
            })
                .then(result => {
                    const ok = result.data;
                    if(ok) {
                        this.errorFlag = false;
                        this.successFlag = true;
                        this.msg = '수정 완료!';
                    }
                    else {
                        this.errorFlag = true;
                        this.successFlag = false;
                        this.msg = '입력한 비밀번호와 계정의 비밀번호가 다릅니다.';
                    }
                })
                .catch(err => {
                    this.$log.error(err);
                });
        }
    }
};
</script>

<style scoped>
.margin-top-100{
  margin-top : 100px;
}
</style>