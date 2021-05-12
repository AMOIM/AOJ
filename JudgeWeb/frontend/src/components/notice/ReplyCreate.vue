<template>
    <v-dialog v-model="reply.addReplyFlag"
    persistent
    max-width="600px">
      <v-card
        class="mx-auto"
        justify="center">
        <v-card-title>
          <span class="headline">답글</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
            persistent
            ref="form"
            justify="center">
            <v-row justify="center">
              <v-col sm="10" md="10">
                <v-textarea
                    rows="3"
                    name="content"
                    label="내용"
                    v-model="reply.content"
                    :rules="reply.contentRules"
                ></v-textarea>
              </v-col>
            </v-row>
            </v-form>
            <v-row>
                <v-col class="text-end">
                    <v-btn class="ma-2" tile outlined color="red" v-on:click="cancelBtn">Cancel</v-btn>
                </v-col>
                <v-col>
                    <v-btn class="ma-2" tile outlined color="success" v-on:click="submitReplyBtn">
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
    props: ['addReply'],
    data: function() {
        return {
            reply: this.addReply
        };
    },
    methods: {
        submitReplyBtn() {
            if(!this.$refs.form.validate()) return;
            this.$emit('submitReply', this.reply);
        },
        cancelBtn() {
            this.reply.addReplyFlag = false;
            this.reply.content = null;
        }
    }
};
</script>