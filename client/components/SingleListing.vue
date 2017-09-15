<template>
  <div class="single">
    <div class="live" v-if="editing == false">
      <h1>J{{this.job.id}} {{job.title}}</h1>
      <p><span class="h2">Created by:</span> {{job.createdby | idToName}}</p>
      <p v-if="job.needby != null"><span class="h2">Deadline:</span> {{job.needby | moment('Do MMM YY')}}</p>
      <p v-if="job.updatedby != null">Last updated by {{job.updatedby | idToName}}, {{job.updatedon | moment('Do MMMM [at] HH:mm')}} </p>
      <div class="description">
        <h2>Description</h2>
        <span v-html="content" class="content"></span>
      </div>
      <div class="banner">
        <h2>There are XX updates to this job</h2>
        <button v-on:click="startEdit()">Edit</button>
        <button v-on:click="cancelEdit()">Add update</button>
      </div>
    </div>
    <div class="edit" v-if="editing == true">
      <h1>J{{job.id}}<input type="text" v-model="job.title"></input></h1>
      <h2>Created by: {{job.createdby | idToName}}</h2>
      <h2>Deadline: <input type="date" v-model="job.needby"></input></h2>
      <h2>Assigned to: <select v-model="job.assignedto">
        <option v-for="user in users" v-bind:value="user.id">{{user.firstname}} {{user.lastname}}</option>
      </select></h2>
      <h2 v-if="job.updatedby != null">Last updated by {{job.updatedby | idToName}}, {{job.updatedon | moment('Do MMMM [at] HH:mm')}} </h2>
      <h2 class="description">Description</h2>
      <textarea rows="20" v-model="job.description"></textarea>
      <div class="banner">
        <h2>Currently editing: job {{job.id}}</h2>
        <button v-on:click="saveEdits()">Save</button>
        <button v-on:click="cancelEdit()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      editing: false
    }
  },
  computed: {
    job() {
      return this.$store.state.job[this.$route.params.jobId];
    },
    users() {
      return this.$store.state.users;
    },
    content(){
      var copy = this.job.description;
      return copy;
    }
  },
  mounted(){
    this.$store.dispatch('job', this.$route.params.jobId);
  },
  methods: {
    statusFromCode: function(code){
      let status = this.$store.state.statuses[code];
      return status.description;
    },
    startEdit: function(){
      this.editing = true;
    },
    cancelEdit: function(){
      this.editing = false;
    },
    saveEdits: function(){
      this.job.updatedby = this.$store.state.me.id;
      this.job.updatedon = new Date();
      this.$store.dispatch('savejob', this.job);
      this.editing = false;
    }
  },
  watch: {
    needby: function (newdeadline) {
      this.updateListings()
    }
  }
}
</script>
