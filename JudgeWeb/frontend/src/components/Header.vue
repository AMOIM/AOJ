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
      <div v-if="$store.state.name !== null" class="margin_right"><v-btn class="link_block" text href="/user">{{$store.state.name}}님</v-btn></div>
      <div v-if="$store.state.name !== null" class="margin_right"><button v-on:click="logout">로그아웃</button> </div>

      <template v-slot:extension>
        <v-row
            align="center"
            color="white"
        >
          <v-btn class="link_block" text href="/markdown/home">
            홈
          </v-btn>
          <v-btn class="link_block" text>
            채점 환경
          </v-btn>
          <v-btn class="link_block" text href="/problem/list">
            문제
          </v-btn>
          <v-btn class="link_block" text href="/contest/list">
            대회
          </v-btn>
          <v-btn class="link_block" text href="/markdown/judge">
            채점 환경
          <v-btn class="link_block" text href="/status">
            내 코드
          </v-btn>
          <div v-if="$store.state.name === 'admin' " class="link_block" ><v-btn text href="/problem/create">
            문제 생성
          </v-btn></div>
          <div v-if="$store.state.name === 'admin' " class="link_block" ><v-btn text href="/contest/create">
            대회 생성
          </v-btn></div>
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