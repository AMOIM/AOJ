<template>
<v-dialog
  v-model="notice.addNoticeFlag"
  persistent
  max-width="600px">
    <v-card
        class="mx-auto"
        justify="center">
        <v-card-title>
          <span class="headline">QnA</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              persistent
              ref="form">
            <v-row justify="center">
            <v-col sm="10" md="10">
              <v-select
                v-model="notice.select"
                :hint="`${notice.select.value}`"
                :items="notice.items"
                item-text="value"
                item-value="ProblemName"
                label="문제"
                return-object
              ></v-select>
            </v-col>
            </v-row>
            <v-row justify="center">
            <v-col sm="10" md="10">
              <v-textarea
                rows="3"
                name="content"
                label="내용"
                v-model="notice.content"
                :rules="notice.contentRules"
              ></v-textarea>
            </v-col>
            </v-row>
          </v-form>
          <v-row>
          <v-col class="text-end">
            <v-btn class="ma-2" tile outlined color="red" v-on:click.prevent="cancelBtn">Cancel</v-btn>
          </v-col>
          <v-col>
            <v-btn class="ma-2" tile outlined color="success" v-on:click.prevent="submitNoticeBtn">
              <v-icon left>mdi-pencil</v-icon> Write
            </v-btn>
          </v-col>
          </v-row>
          </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['addNotice'],
    data: function() {
        return {
            notice: this.addNotice
        };
    },
    methods: {
        submitNoticeBtn() {
            if(!this.$refs.form.validate()) return;
            this.$emit('submitNotice', this.notice);
        },
        cancelBtn() {
            this.notice.addNoticeFlag = false;
            this.notice.content = null;
            this.notice.select = {value: '전체', ProblemName: '전체'};
        }
    }
};
</script>