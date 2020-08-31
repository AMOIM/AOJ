<template>
  <div id="login">
    <div> Login </div>
    <input v-model="user.id" placeholder="ID"> <br/>
    <input v-model="user.password" type="password"  placeholder="password">
    <button v-on:click="login" >login</button>
    <a v-bind:href="url.signUpUrl">Sign up </a>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                id: '',
                password: ''
            },
            url: {
                signUpUrl: '/signup'
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
                            alert('success login');
                            this.$router.push('/');
                        }
                        else {
                            this.$log.info(2);
                            alert('fail login');
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