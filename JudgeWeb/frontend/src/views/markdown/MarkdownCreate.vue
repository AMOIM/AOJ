<template>
  <v-card elevation="0" v-if="this.chk && this.isAdmin">
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

      <v-snackbar
          v-model="snackbar.show"
          :timeout="2000"
          :color="snackbar.color"
      >
        {{ snackbar.text }}
        <v-btn justify="center" text v-on:click="snackbar.show = false">
          close
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-card>
</template>

<script>
import {check} from '@/components/mixins/check';
import {Editor} from 'vuetify-markdown-editor';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

export default {
    components: {
        'markdown-editor' : Editor
    },
    mixins:[check],
    data() {
        return {
            chk: false,
            isAdmin: false,
            homeText: '',
            judgeText: '',
            tabs: null,
            markdownText: '',
            markdownTitle: 'home',
            message: null,
            snackbar: {
                text: '',
                color: '',
                show: '',
            }
        };
    },
    async mounted() {
        this.chk = await this.checkLogin();
        if(this.chk && this.$store.state.name === 'admin') this.isAdmin = true;
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
        async submitMarkDown() {
            if(this.tabs === 'two'){
                this.markdownTitle = 'judge';
                this.markdownText = this.judgeText;
            }
            else {
                this.markdownTitle = 'home';
                this.markdownText = this.homeText;
            }
            try {
                const result = await this.$http.post('/api/markdown/create',
                    {
                        markdownTitle:this.markdownTitle,
                        markdownText:this.markdownText
                    });
                if(result.status === 200) {
                    if(this.markdownTitle === 'home') await this.$router.push('/');
                    else await this.$router.push('/judge');
                }
            }catch(err) {
                this.snackbar.color = 'error';
                this.snackbar.text = '수정 실패하였습니다!';
                this.snackbar.show = true;
            }
        }
    }
};
</script>