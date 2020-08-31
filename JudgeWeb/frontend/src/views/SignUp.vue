<template>
  <div id="SignUp">
    <div> Sign Up </div>
     ID : <input v-model="user.id" placeholder="ID"> <br/>
    Password : <input v-model="user.password" type="password"  placeholder="password">
    name : <input v-model="user.name" placeholder="name"> <br />
    <button v-on:click="signUp" >SignUp</button>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: '',
                name: ''
            }
        };
    },
    methods: {
        signUp: function () {
            this.$http.post('/api/user/signup', { //axios 사용
                user: this.user
            })
                .then((response) => {
                    if(response.data.result === 5) {
                        alert('재로그인 후 이용가능합니다.');
                    }
                    else if(response.data.result === 4) {
                        alert('로그인 후 이용가능합니다.');
                    }
                    else if (response.data.result === 3) {
                        alert('다시 시도해주십시오.');
                    }
                    else if (response.data.result === 2) {
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