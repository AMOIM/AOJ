<template>
<v-card elevation="0" v-if="this.isParticipant || this.isAdmin">
<v-row>
    <v-col style="max-width: 500px;">
        <sidebarComponent style="max-width: 300px;"></sidebarComponent>
        <problemSidebarComponent style="max-width: 300px;"></problemSidebarComponent>
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
import sidebarComponent from '@/components/SideBar';
import problemSidebarComponent from '@/components/ProblemSideBar';
import {check} from '@/components/mixins/check';

export default {
    mixins:[check],
    name: 'scoreboard.vue',
    components: {
        sidebarComponent,
        problemSidebarComponent
    },
    data: () => {
        return {
            isParticipant: false,
            isAdmin: false,
            list : [],
            search: '',
            headers : [
                {
                    text : 'rank',
                    value : 'rank',
                    align : 'rank'
                },
                { text : 'name', value : 'userName'}
            ]
        };
    },
    async created() {
        const id = this.$route.params.id;
        if (id === undefined) {
            await this.$router.push('/404');
            return;
        }
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
                    if(i && list[i - 1].acceptCnt === list[i].acceptCnt
                  && list[i-1].penaltySum === list[i].penaltySum)
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
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin();
        this.isParticipant = await this.checkParticipant(this.$route.params.id);
    }
};
</script>

<style scoped>

</style>