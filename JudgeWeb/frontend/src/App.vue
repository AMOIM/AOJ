<template>
  <v-app>
    <Header/>
    <router-view/>
  </v-app>
</template>

<script>

export default {
    components: {
        Header: () => import('./components/Header')
    }
};
</script>>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #c42626;

    &.router-link-exact-active {
      color: #ad993c;
    }
  }
}
</style>
