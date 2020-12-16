<template>
  <v-card elevation="0" v-if="this.chk">
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
                <router-link :to='{path : "/problem/" + item.problemNum}' class="link">{{ item.problemNum }}</router-link>
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
  </v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';
import {checkuser} from '../components/mixins/checkuser.js';

export default {
    mixins:[checklogin, checkuser],
    name: 'MyStatus.vue',
    components: {
        CodeView: () => import('../components/CodeView')
    },
    data() {
        return {
            chk: false,
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
    async mounted() {
        this.chk = await this.check();
        this.userName = this.$store.state.name;

        this.$http.post('/api/contest/status/0', {
            user: this.userName
        })
            .then(result => {
                for (let item of result.data) {
                    if (item.memory === undefined || item.memory < 0) item.memory = '';
                    else item.memory = Math.round(item.memory / 1000) + 'KB';
                    if (isNaN(item.time) || item.time < 0) item.time = '';
                    else item.time = item.time + 'MS';
                }
                this.list = result.data;
            })
            .catch(err => {
                this.$log.error(err);
            });
    }
};
</script>

<style scoped>
.link {
  text-decoration: none;

}
</style>