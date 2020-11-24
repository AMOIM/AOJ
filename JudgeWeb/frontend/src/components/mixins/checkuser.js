export const checkuser = {
    methods: {
        async checkparticipant(id) {
            let chk = false;
            let result;
            await this.$http.get(`/api/contest/userlist/${id}`)
                .then(
                    (response) => {
                        result = response.data;
                        this.$log.info(result);                              
                        for(let j=0;j<result.userList.length;j++) {
                            if(result.userList[j] === this.$store.state.name) {
                                chk=true;
                            }
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
            if(chk===false) {
                this.$router.push(`/contest/${id}`);
                alert('대회 참가자 아닙니다.');
            }
            return chk;
        }
    }
};