export const checkuser = {
    methods: {
        async checkparticipant(id) {
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
                this.$router.push(`/contest/${id}`);
                alert('대회 참가자 아닙니다.');
            }
            return chk;
        }
    }
};