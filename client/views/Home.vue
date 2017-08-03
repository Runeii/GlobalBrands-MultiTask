<template>
  <div class="page">
    <listings v-if="loggedIn"></listings>
    <login v-else></login>
  </div>
</template>

<script>
import Login from 'components/Login'
import Listings from 'components/Listings'

export default {
  computed: {
    loggedIn(){
      if(Object.keys(this.$store.state.me).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Login,
    Listings
  }
}
</script>

<style lang="scss">
   @import '../styles.scss'
</style>
