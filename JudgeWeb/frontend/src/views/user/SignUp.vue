<template>
  <v-card elevation="0" max-width="30%">
    <v-alert
        dense
        text
        v-if="flag"
        type="error"
    >
      {{msg}}
    </v-alert>
    <v-card-title class="text-h4 justify-center">회원 가입</v-card-title>
    <v-card-text class="margin-top-100">
      <v-text-field
          v-model="user.id"
          type="text"
          label="아이디"
          :rules="idRules"
      />
      <v-text-field
          v-model="user.name"
          type="text"
          label="닉네임"
          :rules="nameRules"
      />
      <v-text-field
          v-model="user.password"
          type="password"
          label="비밀번호"
          @change="checkPassword()"
          :rules="pwRules"
      />
      <v-text-field
          v-model="user.confirmPassword"
          type="password"
          label="비밀번호 확인"
          @change="checkPassword()"
          :rules="pwRules"
          :error-messages="error"/>
      <v-btn class="deep-purple darken-3 white--text margin-top-100" elevation="10" v-on:click="signUp">회원 가입</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: '',
                confirmPassword: '',
                name: '',
            },
            error: '',
            msg : '',
            flag : false,
            idRules:[
                v => !!v || '아이디를 입력해주세요!',
                v => /^[a-zA-Z0-9]*$/.test(v) || '영문과 숫자만 입력 가능합니다.',
                v => v && v.length <= 20 || '아이디를 30자 이내로 입력하세요!',
            ],
            nameRules:[
                v => !!v || '닉네임을 입력해주세요!',
                v => /^[a-zA-Z0-9]*$/.test(v) || '영문과 숫자만 입력 가능합니다.',
                v => v && v.length <= 20 || '닉네임을 128자 이내로 입력하세요!',
            ],
            pwRules: [
                v => !!v || '비밀번호를 입력해주세요!',
                v => v && v.length <= 20 || '비밀번호를 20자 이내로 입력하세요!',
            ],
        };
    },
    methods: {
        checkPassword() {
            if(this.user.password !== this.user.confirmPassword) {
                this.error='비밀번호가 일치하지 않습니다.';
            }
            else {
                this.error='';
            }
        },
        signUp() {
            if(this.error !== '') {
                this.msg = '비밀번호가 일치하지 않습니다.';
                this.flag = true;
                return;
            }
            if(this.user.password.length === 0 || this.user.password.length > 20) {
                this.msg = '비밀번호를 확인해주세요.';
                this.flag = true;
                return;
            }

            this.$http.post('/api/user/signup', { //axios 사용
                user: this.user
            })
                .then((response) => {
                    if (response.data.result === 2) {
                        this.msg = '이미 존재하는 아이디입니다.';
                        this.flag = true;
                    }
                    else if(response.data.result === 3){
                        this.msg = '이미 존재하는 닉네임입니다.';
                        this.flag = true;
                    }
                    else if (response.data.result === 1) {
                        alert('회원가입이 성공적으로 완료되었습니다.');
                        this.$router.push('/');
                    }
                })
                .catch(function (error) {
                    if(error) {
                        alert('Server Error\n문의 바랍니다.');
                        this.$log.error(error);
                    }
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