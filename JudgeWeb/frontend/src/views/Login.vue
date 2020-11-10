<template>
  <div id="login"><br>
    <div> <h1>Login</h1> </div>
     <v-card-text>
      <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.id" type="text" label="아이디"/></v-col>
      <v-col cols="12" sm="6" md="4"><v-text-field v-model="user.password" type="password"  label="패스워드"/></v-col>
      <v-btn class="deep-purple darken-3 white--text" elevation="10" v-on:click="login" >login</v-btn>
      </v-card-text>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: ''
            }
        };
    },
    methods: {
        login () {
            this.$http.post('/api/user/login', {
                user: this.user
            })
                .then(
                    async(response) => {
                        if(response.data.token) {
                            this.$log.info(1);
                            await this.$store.dispatch('login', response.data.token);
                            this.$router.push('/');
                        }
                        else {
                            this.$log.info(2);
                            alert('로그인이 실패하였습니다.');
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