<template>
  <div class="single">
    <div class="edit">
      <h1>Title: <input type="text" v-model="job.title"></input></h1>
      <p>Deadline: <input type="date" v-model="job.needby"></input></p>
      <div class="description">
        <h2>Description</h2>
        <textarea rows="20" v-model="job.description"></textarea>
      </div>
      <div class="banner">
        <button v-on:click="saveCreate()">Save</button>
        <button v-on:click="cancelCreate()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  computed: {
    job() {
      var standardkeys = Object.keys(this.$store.state.job);
      var blankslate = {};
      standardkeys.forEach(function(key){
        blankslate[key] = ''
      });
      blankslate.id = 'new';
      return blankslate;
    }
  },
  methods: {
    cancelCreate: function(){
      this.$router.push('/');
    },
    saveCreate: function(){
      this.$store.dispatch('savejob', this.job);
  //    this.$router.push('/');
    }
  }
}
</script>
