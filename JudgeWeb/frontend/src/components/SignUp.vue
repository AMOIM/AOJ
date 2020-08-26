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
                    if (response.data.result === 3) {
                        alert('Error, please, try again');
                    }
                    else if (response.data.result === 2) {
                        alert('Existed ID, try again');
                    }
                    else if (response.data.result === 1) {
                        alert('Success');
                        this.$router.push('/'); 
                    }
                    else {
                        alert(response.data.result);
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