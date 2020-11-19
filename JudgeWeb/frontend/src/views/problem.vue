<template>
<v-container>
    <v-container>
    <v-list-item three-line style="padding: 0px;">
        <v-list-item-content class="text-left align-self-start">
            <v-list-item-title style="font-size: 30px; padding: 10px;" v-html="problem.title"></v-list-item-title>
            <v-divider></v-divider>
            <v-list-item-subtitle style="padding-left: 10px;">
                <v-row>
                    <v-col style="color: #5F5F5F;">시간 제한     <v-divider vertical></v-divider> {{problem.timeLimit}}초</v-col>
                    <v-col style="color: #5F5F5F;">메모리 제한     <v-divider vertical></v-divider> {{problem.memoryLimit}}MB</v-col>
                </v-row>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
    <v-list-item style="padding: 0px;">
        <v-list-item-content class="text-left align-self-start">
            <v-list-item-title style="font-size: 20px; padding: 10px;">문제</v-list-item-title>
            <v-divider></v-divider>
        </v-list-item-content>
    </v-list-item>
    <v-row style="margin-left: 10px;">
        {{problem.description}}
    </v-row>
    <br/>
    <v-list-item style="padding: 0px;">
        <v-list-item-content class="text-left align-self-start">
            <v-list-item-title style="font-size: 20px; padding: 10px;">입력</v-list-item-title>
            <v-divider></v-divider>
        </v-list-item-content>
    </v-list-item>
    <v-row style="margin-left: 10px;">
        {{problem.inputDescription}}
    </v-row>
    <br/>
    <v-list-item style="padding: 0px;">
        <v-list-item-content class="text-left align-self-start">
            <v-list-item-title style="font-size: 20px; padding: 10px;">출력</v-list-item-title>
            <v-divider></v-divider>
        </v-list-item-content>
    </v-list-item>
    <v-row style="margin-left: 10px;">
        {{problem.outputDescription}}
    </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(item, i) in problem.inputList" :key='item._id'>
          <v-col>
            <v-list-item style="padding: 0px;">
                <v-list-item-content class="text-left align-self-start">
                <v-list-item-title style="font-size: 20px; padding: 10px;">예제 입력 {{i+1}}</v-list-item-title>
                <v-divider></v-divider>
                </v-list-item-content>
            </v-list-item>
            <v-textarea
                background-color="deep-purple lighten-5"
                name="input"
                filled
                label="input"
                auto-grow
                readonly
                :value='item.txt'
            ></v-textarea>
          </v-col>
          <v-col>
            <v-list-item style="padding: 0px;">
                <v-list-item-content class="text-left align-self-start">
                <v-list-item-title style="font-size: 20px; padding: 10px;">예제 출력 {{i+1}}</v-list-item-title>
                <v-divider></v-divider>
                </v-list-item-content>
            </v-list-item>
            <v-textarea
                background-color="deep-purple lighten-5"
                name="output"
                filled
                label="output"
                auto-grow
                readonly
                :value='problem.outputList[i].txt'
            ></v-textarea>
          </v-col>
        </v-row>
    </v-container>
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
      <v-btn
        class="ma-2"
        color="deep-purple darken-2"
        dark
        @click="submit"
      >
        제출
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
    </form>
</v-container>
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
                this.problem.timeLimit = this.problem.timeLimit / 1000;
                this.problem.memoryLimit = this.problem.memoryLimit / 1000000;
            })
            .catch(err => this.$log.error(err));
    }
};
</script>

<style scoped>

</style>