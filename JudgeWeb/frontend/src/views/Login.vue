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
    <v-card-title class="text-h4 justify-center">로그인</v-card-title>
    <v-card-text class="margin-top-100">
      <v-text-field v-model="user.id" type="text" label="아이디" @keyup.enter="login"/>
      <v-text-field v-model="user.password" type="password"  label="비밀번호" @keyup.enter="login"/>
      <v-btn class="deep-purple darken-3 white--text margin-top-100" elevation="10" v-on:click="login">로그인</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: ''
            },
            flag : false,
            msg : '',
        };
    },
    methods: {
        login () {
            this.$http.post('/api/user/login', {
                user: this.user
            })
                .then(
                    async(response) => {
                        if (response.data.token) {
                            await this.$store.dispatch('login', response.data.token);
                            this.$router.push('/');
                        } else {
                            this.msg = '존재하지 않거나 계정의 정보가 일치하지 않습니다.';
                            this.flag = true;
                        }
                    }
                )
                .catch(err => {
                    this.$log.error('Server error\n' + err);
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