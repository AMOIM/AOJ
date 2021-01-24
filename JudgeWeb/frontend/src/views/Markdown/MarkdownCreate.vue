<template>
<v-card elevation="0" v-if="this.chk && this.isadmin">
<v-container>
        <v-container
           style="margin: 0px;">
        <v-tabs
          v-model="tabs"
          style="padding: 0px; margin: 0px;"
        >
          <v-tab href="#one">
            Home.md
          </v-tab>
          <v-tab href="#two">
            Judge.md
          </v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
        </v-container>
        <markdown-editor
            v-if="activeText.text==='1'"
            mode="preview"
            :outline="true"
            v-model="homeText"
            style="text-align: left;"
        />
        <markdown-editor
            v-if="activeText.text==='2'"
            mode="preview"
            :outline="true"
            v-model="judgeText"
            style="text-align: left;"
        />
        <v-row
            align="center"
            justify="space-around"
        >
            <v-btn 
                text
                color="deep-purple lighten-1"
                @click="submitMarkDown()">
                작성
            </v-btn>
        </v-row>
</v-container>
</v-card>
</template>

<script>
import {checklogin} from '../../components/mixins/checklogin';
import {Editor} from 'vuetify-markdown-editor';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

export default {
    components: {
        'markdown-editor' : Editor
    },
    mixins:[checklogin],
    data() {
        return {
            chk: false,
            isadmin: false,
            homeText: '',
            judgeText: '',
            tabs: null,
            markdownText: '',
            matkdownTitle: '',
            message: null,
        };
    },
    async mounted() {
        this.chk = await this.check();
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        if(this.chk && this.$store.state.name !== 'admin') {
            this.$router.push('/');
            alert('관리자만 접근이 가능합니다.');
        }
    },
    async created() {
        const res = await this.$http.get('/api/markdown/get');
        this.homeText = res.data.homeMarkdown;
        this.judgeText = res.data.judgeMarkdown;
    },
    computed: {
        activeText() {
            switch(this.tabs) {
            case 'one' : return {text: '1'};
            case 'two' : return {text: '2'};
            default: return {text: '1'};
            }
        },
    },
    methods: {
        submitMarkDown() {
            if(this.tabs === 'two'){
                this.matkdownTitle = 'judge';
                this.markdownText = this.judgeText;
            }
            else {
                this.matkdownTitle = 'home';
                this.markdownText = this.homeText;
            }
            this.$http.post('/api/markdown/create',
                {
                    markdownTitle:this.matkdownTitle,
                    markdownText:this.markdownText
                });
        }
    }
};
</script>