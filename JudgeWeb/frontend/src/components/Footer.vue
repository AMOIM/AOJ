<template>
  <v-card>
    <v-app-bar class="app_bar"
        color="#673AB7"
        dark
        dense
    >
      <v-toolbar-title class="margin_left">©️ {{new Date().getFullYear()}} by A-MOIM, All rights reserved. This website is open source on <a href="https://github.com/AMOIM/AOJ" style="color : white">GitHub.</a></v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="#" class="link_white">About A-MOIM</router-link>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
    name: 'Footer.vue',
};
</script>

<style scoped>
  .app_bar {
    position:fixed; 
    left:0px; 
    bottom:0px; 
    height:60px; 
    width:100%; 
  }
  .margin_left {
    margin-left : 3%;
  }
  .link_white {
    color : white;
    text-decoration: none;
  }
</style>