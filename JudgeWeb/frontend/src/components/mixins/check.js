export const check = {
    methods: {
        async checkLogin(ignoreRedirect) {
            if(typeof ignoreRedirect === 'undefined') ignoreRedirect = false;
            let chk = false;
            await this.$http.get('/api/check')
                .then(async (response)=> {
                    if(response.data.result === 5) {
                        if(!ignoreRedirect) {
                            alert('로그인시간이 만료되었습니다. 다시 로그인해주세요.');
                            await this.$store.dispatch('logout');
                            await this.$router.push('/login');
                        }
                    }
                    else if(response.data.result === 4) {
                        if(!ignoreRedirect) {
                            await this.$router.push('/login');
                            alert('로그인 후 이용가능합니다.');
                        }
                    }
                    else chk = true;
                })
                .catch((err) => {
                    this.$log.error('Token error\n'+ err);
                });    
            return chk;
        },

        async checkParticipant(id) {
            let chk = false;
            let result;
            await this.$http.get(`/api/contest/userlist/${id}`)
                .then(
                    (response) => {
                        result = response.data;

                        for(let j=0;j<result.length;j++) {
                            if(result[j] === this.$store.state.name) {
                                chk=true;
                            }
                        }
                    }
                )
                .catch(error => {
                    this.$log.error(error);
                });
            if(chk===false) {
                alert('대회 참가자 아닙니다.');
                await this.$router.push(`/contest/${id}`);
            }
            return chk;
        },

        async checkAdmin(ignoreRedirect){
            const isLogin = await this.checkLogin(ignoreRedirect);
            if(isLogin === false) return false;

            return this.$store.state.name === 'admin';
        },

        async checkTime(num) {
            let openProblems = false;
            await this.$http.get(`/api/contest/gettime/${num}`)
                .then(
                    async (res) => {
                        const dif = new Date(res.data.start) - new Date();
                        const now = await this.TimeFormat(new Date());
                        const start = await this.TimeFormat(new Date(res.data.start));
                        if(now >= start) openProblems = true;
                        if(dif > 0) setTimeout('location.reload()', dif);
                    })
                .catch(error => {
                    this.$log.error('ContestTime error\n'+error);
                });
            return openProblems;
        },

        TimeFormat(time) {
            const year = time.getFullYear();
            const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
            const date = time.getDate() >=10 ? time.getDate() : '0' + time.getDate();
            const hour = time.getHours() >=10 ? time.getHours() : '0' + time.getHours();
            const minute = time.getMinutes() >=10 ? time.getMinutes() : '0' + time.getMinutes();
            const second = time.getSeconds() >=10 ? time.getSeconds() : '0' + time.getSeconds();
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        }
    }
};