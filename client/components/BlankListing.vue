<template>
  <div class="single">
    <div class="edit">
      <h2>Title: <input type="text" v-model="job.title"></input></h2>
      <h2>Deadline: <input type="date" v-model="job.needby"></input></h2>
      <h2>Assigned to: <select v-model="job.assignedto">
        <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
      </select></h2>
      <h2 class="description">Description</h2>
      <textarea rows="20" v-model="job.description"></textarea>
    </div>
    <div class="banner">
      <button v-on:click="saveCreate()">Save</button>
      <button v-on:click="cancelCreate()">Cancel</button>
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
    },
    users: function() {
      return this.$store.state.users;
    }
  },
  methods: {
    cancelCreate: function(){
      this.$router.push('/');
    },
    saveCreate: function(){
      var router = this.$router;
      this.job.createdon = new Date();
      this.job.createdby = this.$store.state.me.id;
      if(this.job.assignedto != null) {
        this.job.status_id = 2;
      } else {
        this.job.status_id = 1;
      }
      this.$store.dispatch('savejob', this.job);
      router.push('/');
    }
  }
}
</script>
