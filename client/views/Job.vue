<template>
  <div class="page">
    <BlankListing v-if="$route.params.jobId === 'new'"></BlankListing>
    <SingleListing v-else></SingleListing>
  </div>
</template>

<script>
import SingleListing from 'components/SingleListing'
import BlankListing from 'components/BlankListing'
export default {
  data(){
    return {
      creatingnew: false
    }
  },
  components: {
    SingleListing,
    BlankListing
  }
}
</script>

<style lang="scss">
   @import '../styles.scss'
</style>
