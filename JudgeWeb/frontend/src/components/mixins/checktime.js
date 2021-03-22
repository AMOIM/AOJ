export const checktime = {
    methods: {
        async checktime(num) {
            let openProblems = false;
            await this.$http.get(`/api/contest/userlist/${num}`)
                .then(
                    async (res) => {
                        const contest = res.data;
                        const now = await this.TimeFormat(new Date());
                        const start = await this.TimeFormat(new Date(contest.start));
                        if(now >= start) openProblems = true;
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
            const formatTime = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + '00';
            return formatTime;
        }
    }
};