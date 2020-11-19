<template>
  <v-card class="overflow-hidden">
    <v-app-bar
        color="#673AB7"
        dark
        fade-img-on-scroll
    >
      <v-toolbar-title class="margin_left">AOJ</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="$store.state.name === null" class="margin_right">
        <router-link to="/signUp" class="link_white">회원가입</router-link>
      </div>
      <div v-if="$store.state.name === null" class="margin_right">
        <router-link to="/login" class="link_white">로그인</router-link>
      </div>
      <div v-if="$store.state.name !== null" class="margin_right"> {{$store.state.name}}님</div>
      <div v-if="$store.state.name !== null" class="margin_right"><button v-on:click="logout">로그아웃</button> </div>

      <template v-slot:extension>
        <v-row
            align="center"
            color="white"
        >
          <v-btn class="link_block" text href="/">
            홈
          </v-btn>
          <v-btn class="link_block" text href="/contest/list">
            대회
          </v-btn>
          <v-btn class="link_block" text>
            채점 환경
          </v-btn>
        </v-row>
      </template>

    </v-app-bar>
  </v-card>
</template>

<script>
export default {
    name: 'Header.vue',
    methods: {
        logout () {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
    },
};
</script>

<style scoped>
  .margin_right {
    margin-right : 2%;
  }
  .margin_left {
    margin-left : 3%;
  }
  .link_white {
    color : white;
    text-decoration: none;
  }
  .link_block {
    margin-left : 3%;
  }
</style>