<template>
  <v-container fluid>
    <v-form
        persistent
        ref="form">
     <v-row justify="center">
       <v-col sm="5" md="5">
          <v-select
            v-model="select"
            :hint="`${select.value}`"
            :items="items"
            item-text="value"
            item-value="ProblemName"
            label="문제"
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="center">
       <v-col sm="5" md="5">
         <v-textarea
           rows="3"
           name="content"
           label="내용"
           v-model="content"
           :rules="contentRules"
        ></v-textarea>
       </v-col>
      </v-row>
    </v-form>
      <v-row justify="center">
       <v-col sm="5" md="5" class="text-end">
        <v-btn
          class="ma-2" outlined large fab color="indigo" v-on:click.prevent="submitNotice">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            select: {value: '전체', ProblemName: '전체'},
            items: [
                {value: '전체', ProblemName: '전체'},
                {value: 'A', ProblemName: 'A'},
                {value: 'B', ProblemName: 'B'},
                {value: 'C', ProblemName: 'C'},
                {value: 'D', ProblemName: 'D'}
            ],
            content: null,
            contentRules: [
                v => !!v || '질문내용 입력 부탁드립니다!'
            ]
        };
    },
    methods: {
        async submitNotice() {
            if(!this.$refs.form.validate()) return;
            await axios.post('/api/notice/create',
                {
                    competitionNum : 1,
                    isQnA: false,
                    problemNum: this.select.value,
                    content: this.content
                });
        }
    }
};
</script>