<template>
  <div class="login">
    <label>Username</label>
    <input v-model="username" type="text"></input>
    <labeL>Password</label>
    <input v-model="password" type="password"></input>
    <button v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username: '',
      password: '',
      status: null
    }
  },
  mounted(){

  },
  methods: {
    login(){
      this.$store.dispatch('login', {username: this.username, password: this.password});
    }
  }
}
</script>

<style lang="scss">
   @import '../styles.scss'
</style>
