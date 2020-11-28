<template>
<v-card elevation="0" v-if="this.chk">
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
      <v-row v-for="(item, i) in problem.inputList.slice(0,2)" :key='item._id'>
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
            label="제출 언어"
            outlined
            style="max-width : 200px"
        ></v-select>
      </v-col>
      <prism-editor class="my-editor height-400" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
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
</v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
    mixins:[checklogin],
    name: 'problem.vue',
    components: {
        PrismEditor,
    },
    data: () => {
        return {
            chk: false,
            problem: {},
            code : '',
            language: ['c', 'cpp', 'java', 'python2', 'python3'],
            lang : 'cpp',
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
                    this.$router.push({path : '/status/'});
                }).catch(err => {
                    alert('제출 오류');
                    this.$log.error(err);
                });
        },
        highlighter(code) {
            return highlight(code, languages.js); //returns html
        }
    },
    async mounted() {
        this.chk = await this.check();
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
                this.problem.timeLimit = this.problem.timeLimit / 1000;
                this.problem.memoryLimit = this.problem.memoryLimit / 1000000;
            })
            .catch(err => this.$log.error(err));

        this.code = '\n\n\n\n\n\nWrite your code\nAnd submit code\n\n\n\n\n\n';
    }
};
</script>

<style lang="scss">
// required class
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}
</style>