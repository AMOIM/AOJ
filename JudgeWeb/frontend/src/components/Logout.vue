<template>
  <div id="logout">
    <button v-on:click="logout" >logout</button>
  </div>
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
</script>