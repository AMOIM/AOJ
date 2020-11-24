<template>
  <div>
    {{ problem.number }} <br/>
    {{ problem.description }}

    {{ problem.memoryLimit / 1000000 }}MB
    {{ problem.timeLimit }}

    <ul>
      <li v-for="(item, i) in problem.inputList" :key='item._id'>
        <v-textarea
            name="input"
            filled
            label="input"
            auto-grow
            readonly
            :value='item.txt'
        ></v-textarea>
        <v-textarea
            name="output"
            filled
            label="output"
            auto-grow
            readonly
            :value='problem.outputList[i].txt'
        ></v-textarea>
      </li>
    </ul>

    <form>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
            v-model="lang"
            :items="language"
            label="Outlined style"
            outlined
        ></v-select>
      </v-col>
      <v-textarea
          name="code"
          filled
          label="source code"
          auto-grow
          v-model="code"
      ></v-textarea>
      <v-btn class="mr-4" @click="submit">제출</v-btn>
    </form>
  </div>
</template>

<script>
export default {
    name: 'problem.vue',
    data: () => {
        return {
            problem: {},
            code : '',
            language: ['c', 'cpp', 'java', 'python2', 'python3'],
            lang : 'c',
            userName : ''
        };
    },
    methods : {
        submit () {
            this.$http.post('/api/problem/submit', {
                code : this.code,
                lang : this.lang,
                userName : this.userName,
                problemNum : this.problem.number
            })
                .then(() => {
                    alert('제출 완료');
                    this.$router.go(0);
                }).catch(err => {
                    alert('제출 오류');
                    this.$log.error(err);
                });
        }
    },
    created() {
        this.userName = this.$store.state.name;
        const id = this.$route.params.id;
        if (id === undefined)
            this.$router.go(-1);
        this.$http.post('/api/problem', {
            id: id
        })
            .then(result => {
                this.problem = result.data;
                if(this.problem === null){
                    alert('존재하지 않는 문제입니다.');
                    this.$router.go(-1);
                }
            })
            .catch(err => this.$log.error(err));
    }
};
</script>

<style scoped>

</style>