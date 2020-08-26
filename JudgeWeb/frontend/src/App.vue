<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Home</router-link>
      | <router-link to="/about">About</router-link> 
      <div v-if="$store.state.user === null">| <router-link to="/signUp">SignUp</router-link> </div>
      <div v-if="$store.state.user === null">| <router-link to="/login">Login</router-link> </div>
      <div v-if="$store.state.user !== null">|  <router-link to="/logout">Logout</router-link></div> <br>
      <div v-if="$store.state.user !== null"> {{$store.state.user}}님</div>
    </div>
    <router-view/>
  </v-app>
</template>
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
