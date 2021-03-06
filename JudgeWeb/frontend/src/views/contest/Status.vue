<template>
<v-card elevation="0" v-if="this.isParticipant || this.isAdmin">
  <v-row>
    <v-col style="max-width: 500px;">
      <sidebarComponent style="max-width: 300px;"></sidebarComponent>
      <problemSidebarComponent style="max-width: 300px;"></problemSidebarComponent>
    </v-col>
    <v-col>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">채점 번호</th>
            <th class="text-center">닉네임</th>
            <th class="text-center">문제 번호</th>
            <th class="text-center">결과</th>
            <th class="text-center">메모리</th>
            <th class="text-center">시간</th>
            <th class="text-center">언어</th>
            <th class="text-center">코드</th>
            <th class="text-center">제출 시간</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in calData" :key="item.name">
            <td>{{ item.number }}</td>
            <td>{{item.userName}}</td>
            <td>
              <router-link :to='{path : "/problem/" + item.problemNum}' class="link">{{ item.alphabet }}</router-link>
            </td>
            <td>
              <span style="font-weight : bold" :style="{ color : statusColor(item.status)}">{{ item.status }}</span>
            </td>
            <td>{{ item.memory }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.lang }}</td>
            <td>
              <v-btn
                  text
                  @click="myCode.view = item.code; myCode.show=true;"
              >code
              </v-btn>
            </td>
            <td>{{ item.date | moment('YYYY-MM-DD HH:mm:ss') }}</td>
          </tr>
          </tbody>
          <CodeView :myCode="myCode"></CodeView>
        </template>
      </v-simple-table>
      <div class="text-center">
        <v-pagination
            v-model="page"
            :length="numOfPages"
            :total-visible="7"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import {check} from '@/components/mixins/check';

export default {
    mixins:[check],
    name: 'status.vue',
    components: {
        CodeView: () => import('../../components/CodeView'),
        sidebarComponent: () => import('@/components/sidebar/SideBar'),
        problemSidebarComponent: () => import('@/components/sidebar/ProblemSideBar')
    },
    data() {
        return {
            isParticipant: false,
            isAdmin: false,
            list: [],
            userName: '',
            myCode: {
                view: '',
                show: false
            },
            page : 1,
            dataPerPage: 20,
        };
    },
    methods: {
        statusColor(val) {
            if (val === '맞았습니다') return 'green';
            else if (val === '채점 중') return 'orange';
            else return 'red';
        },
    },
    computed: {
        startOffset() {
            return (this.page - 1) * this.dataPerPage;
        },
        endOffset() {
            return this.startOffset + this.dataPerPage;
        },
        numOfPages() {
            return Math.ceil(this.list.length / this.dataPerPage);
        },
        calData() {
            return this.list.slice(this.startOffset, this.endOffset);
        },
    },
    async created() {
        const id = this.$route.params.id;

        if (id === undefined) {
            await this.$router.push('/404');
            return;
        }
      
        this.userName = this.$store.state.name;

        const apiProblem = await this.$http.get(`/api/contest/${id}`);
        const problemList = apiProblem.data;

        this.$http.get(`/api/contest/status/${id}/${this.userName}`)
            .then(result => {
                for (let item of result.data) {
                    if (item.memory === undefined || item.memory < 0) item.memory = '';
                    else item.memory = Math.round(item.memory / 1000) + 'KB';
                    if (isNaN(item.time) || item.time < 0) item.time = '';
                    else item.time = item.time + 'MS';

                    for (let idx in problemList) {
                        if (problemList[idx].number === item.problemNum)
                            item.alphabet = problemList[idx].alphabet;
                    }
                }
                this.list = result.data;
            })
            .catch(err => {
                this.$log.error(err);
            });
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin();
        if(this.isAdmin === false)
            this.isParticipant = await this.checkParticipant(this.$route.params.id);
    }
};
</script>

<style scoped>
.link {
  text-decoration: none;

}
</style>