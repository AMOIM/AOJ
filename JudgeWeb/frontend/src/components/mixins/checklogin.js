export const checklogin = {
    methods: {
        async check(num) {
            let chk = false;
            await this.$http.get('/api/check')
                .then((response)=> {
                    if(response.data.result === 5) {
                        if(num!==1) {
                            alert('로그인시간이 만료되었습니다. 다시 로그인해주세요.');
                            this.$store.dispatch('logout');
                            this.$router.push('/login');
                        }
                    }
                    else if(response.data.result === 4) {
                        if(num!==1) this.$router.push('/login');
                        if(num!==1) alert('로그인 후 이용가능합니다.');
                    }
                    else chk = true;
                })
                .catch((err) => {
                    this.$log.error('Token error\n'+err); 
                });    
            return chk;
        }
    }
};