<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img src="./../../static/logo.png" v-on:click="navigateToJob(listing.id)" />
      </router-link>
      <h3 v-if="loggedIn">Logged in as {{loggedIn}}</h3>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    loggedIn(){
      if(Object.keys(this.$store.state.me).length > 0) {
        return this.$store.state.me.username;
      } else {
        return false;
      }
    }
  }
}
</script>
