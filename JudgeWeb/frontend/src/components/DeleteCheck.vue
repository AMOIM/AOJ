<template>
  <v-dialog
      v-model="show"
      max-width="290"
      persistent
  >
    <v-card>
      <v-card-title class="headline">실행하시겠습니까?</v-card-title>

      <v-card-text>
        <br/>
        <span v-if="user">회원 탈퇴를 합니까?</span>
        <span v-else>대회 참가자들 탈퇴를 합니까?</span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="deep-purple darken-3 white--text"
            text
            @click="isAccept(true)"
        >
          네!!
        </v-btn>

        <v-btn
            color="deep-purple darken-3 white--text"
            text
            @click="isAccept(false)"
        >
          절대 안돼ㅐㅐ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'DeleteCheck',
    props: ['show', 'user'],
    methods : {
        isAccept(yes){
            this.$emit('isAccept', yes);
        }
    }
};
</script>

<style scoped>

</style>