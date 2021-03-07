<template>
<v-card elevation="0" v-if="(this.chk && this.chk2) || this.isadmin">
<v-row>
    <v-col style="max-width: 500px;">
        <sidebarComponent style="max-width: 300px;" :data="model"></sidebarComponent>
    </v-col>
    <v-col>
        <v-card
            outlined>
            <v-card-title>
                Scoreboard
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="list"
                :search="search"
                hide-default-footer
            ></v-data-table>
        </v-card>
    </v-col>
</v-row>
</v-card>
</template>

<script>
import sidebarComponent from '../components/SideBar';
import {checklogin} from '../components/mixins/checklogin.js';
import {checkuser} from '../components/mixins/checkuser.js';

export default {
    mixins:[checklogin, checkuser],
    name: 'scoreboard.vue',
    components: {
        sidebarComponent
    },
    data: () => {
        return {
            chk: false,
            chk2: false,
            isadmin: false,
            list : [],
            search: '',
            headers : [
                {
                    text : 'rank',
                    value : 'rank',
                    align : 'rank'
                },
                { text : 'name', value : 'userName'}
            ],
            model: 1,
        };
    },
    async mounted() {
        if(this.$store.state.name === 'admin') this.isadmin = true;
        else {
            this.chk = await this.check();
            this.chk2 = await this.checkparticipant(this.$route.params.id);
        }
        const id = this.$route.params.id;
        if (id === undefined)
            this.$router.go(-1);
        this.$http.get(`/api/contest/scoreboard/${id}`)
            .then(result => {
                const list = result.data;
                for(let i = 0; i < list[0].problemList.length; i++)
                    this.headers.push({text : `${String.fromCharCode(i + 65)}`, value : 'problem[' + i + ']'});
                this.headers.push({text : 'total', value : 'total'});
                for(let i = 0; i < list.length; i++) {
                    const obj = {
                        rank : 0,
                        userName : '',
                        problem : [],
                        total : ''
                    };
                    if(i && list[i - 1].acceptCnt === list[i].acceptCnt && list[i-1].penaltySum === list[i].penaltySum)
                        obj.rank = '-';
                    else obj.rank = i + 1;

                    obj.userName = list[i].userName;
                    obj.total = `${list[i].acceptCnt} / ${list[i].penaltySum}`;
                    for(let j = 0;j < list[i].problemList.length ; j++) {
                        const problem = list[i].problemList[j];
                        this.$log.info(problem.accept);
                        const penalty = problem.accept === false ? '-' : problem.penalty;
                        obj.problem.push(`${problem.submitCnt} / ${penalty}`);
                    }
                    this.list.push(obj);
                }
            })
            .catch(err => {
                this.$log.error(err);
            });
    }
};
</script>

<style scoped>

</style>