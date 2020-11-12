<template>
  <div id="SignUp"> <br>
    <div><h1> Sign Up </h1></div>
    <v-card-text >   
     <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.id" type="text" label="아이디" /></v-col>
     <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.password" type="password"  label="패스워드" /></v-col>
     <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.confirmpassword" type="password"  label="패스워드확인" 
     @change="checkpassword()"
     :error-messages="error"/></v-col>
     <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.name" type="text" label="닉네임" /></v-col>
     <v-btn class="deep-purple darken-3 white--text" elevation="10" v-on:click="signUp" >SignUp</v-btn>
    </v-card-text>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: '',
                confirmpassword: '',
                name: ''
            },
            error: ''
        };
    },
    methods: {
        checkpassword() {
            if(this.user.password !== this.user.confirmpassword) {
                this.error='비밀번호가 일치하지 않습니다.';
                return;
            }
            else {
                this.error='';
                return;
            }
        },
        signUp: function () {
            if(this.error !== '') {
                alert('비밀번호를 확인해주세요.');
                return;
            }
            this.$http.post('/api/user/signup', { //axios 사용
                user: this.user
            })
                .then((response) => {
                    //if(response.data.result === 5) {
                    //  alert('재로그인 후 이용가능합니다.');
                    // }
                    //else if(response.data.result === 4) {
                    //  alert('로그인 후 이용가능합니다.');
                    //}
                    //else if (response.data.result === 3) {
                    //  alert('다시 시도해주십시오.');
                    //}
                    if (response.data.result === 2) {
                        alert('이미 존재하는 아이디입니다.');
                    }
                    else if (response.data.result === 1) {
                        alert('회원가입이 성공적으로 완료되었습니다.');
                        this.$router.push('/'); 
                    }
                })
                .catch(function (error) {
                    if(error) {
                        alert('error');
                    }
                });
        }
    }
};
</script>