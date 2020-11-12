<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-center">채점 번호</th>
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
      <tr v-for="item in list" :key="item.name">
        <td>{{ item.number }}</td>
        <td><router-link :to='{path : "/problem/" + item.problemNum}' class="link">{{ item.alphabet }}</router-link></td>
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
</template>

<script>

export default {
    name: 'status.vue',
    components: {
        CodeView: () => import('../components/CodeView'),
    },
    data () {
        return {
            list: [],
            userName: '',
            myCode: {
                view: '',
                show: false
            }
        };
    },
    methods : {
        statusColor(val) {
            if(val === '맞았습니다') return 'green';
            else if(val === '채점 중') return 'orange';
            else return 'red';
        }
    },
    async mounted() {
        this.userName = this.$store.state.name;
        const id = this.$route.params.id;
        if (id === undefined)
            this.$router.go(-1);
        const apiProblem = await this.$http.get(`/api/contest/${id}`);
        const problemList = apiProblem.data;

        this.$log.info(problemList);

        this.$http.post(`/api/contest/status/${id}`, {
            user: this.userName
        })
            .then(result => {
                for (let item of result.data) {
                    if (item.memory === undefined || item.memory < 0) item.memory = '';
                    else item.memory = Math.round(item.memory / 1000) + 'KB';
                    if (isNaN(item.time) || item.time < 0) item.time = '';
                    else item.time = item.time + 'MS';

                    for(let idx in problemList){
                        if(problemList[idx].number === item.problemNum)
                            item.alphabet = problemList[idx].alphabet;
                    }
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
.link{
  text-decoration: none;

}
</style>