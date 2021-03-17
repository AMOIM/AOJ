export const checktime = {
    methods: {
        async checktime(num) {
            let openProblems = false;
            let contest;
            let now = new Date();
            let start = new Date();
            await this.$http.get(`/api/contest/userlist/${num}`)
                .then(
                    (res) => {
                        contest = res.data;
                        start = new Date(contest.start);
                    })
                .catch(error => {
                    this.$log.error('ContestTime error\n'+error); 
                });
            now = await this.TimeFormate(now);
            start = await this.TimeFormate(start);
            if(now >= start) openProblems = true;
            return openProblems;
        },
        TimeFormate(time) {
            let year = time.getFullYear(); 
            let month = time.getMonth() + 1;
            month = month >=10 ? month : '0' + month;
            let date = time.getDate();
            date = date >=10 ? date : '0' + date;
            let hour = time.getHours();
            hour = hour >=10 ? hour : '0' + hour;
            let minute = time.getMinutes();
            minute = minute >=10 ? minute : '0' + minute;
            time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + '00';
            return time;
        }
    }
};