<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Home</router-link>
      | <router-link to="/signUp">SignUp</router-link> 
      <div v-if="$store.state.name === null">| <router-link to="/login">Login</router-link> </div>
      <div v-if="$store.state.name !== null"><button v-on:click="logout">Logout</button></div> <br>
      <div v-if="$store.state.name !== null"> {{$store.state.name}}님</div>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
export default {
    methods: {
        logout () {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
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
