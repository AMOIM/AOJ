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
      <div v-if="$store.state.name !== null" class="margin_right"><router-link to="/user" class="link_white">{{$store.state.name}}님</router-link></div>
      <div v-if="$store.state.name !== null" class="margin_right"><button v-on:click="logout">로그아웃</button> </div>

      <template v-slot:extension>
        <v-row
            align="center"
            color="white"
        >
          <router-link to="/" class="link_block link_white">홈</router-link>

          <router-link to="/judge" class="link_block link_white">
            채점 환경
          </router-link>

          <router-link to="/problem/list" class="link_block link_white">
            문제
          </router-link>

          <router-link to="/contest/list" class="link_block link_white">
            대회
          </router-link>

          <router-link to="/status" class="link_block link_white">
            내 코드
          </router-link>

          <div v-if="$store.state.name === 'admin' " class="link_block" ><router-link to="/problem/create" class="link_white">
            문제 생성
          </router-link></div>

          <div v-if="$store.state.name === 'admin' " class="link_block" ><router-link to="/contest/create" class="link_white">
            대회 생성
          </router-link></div>

          <div v-if="$store.state.name === 'admin' " class="link_block" ><router-link to="/user/delete" class="link_white">
            회원 탈퇴
          </router-link></div>
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