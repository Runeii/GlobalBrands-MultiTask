<template>
  <div class="index">
    <router-link to="/job/new">
      <button>Create new job</button>
    </router-link>
    <ul>
      <li>By status
        <select v-model="currentstatus">
          <option value="0">Show all</option>
          <option v-for="status in statuses" v-bind:value="status.id" v-if="status.id != 6">{{status.description}}</option>
        </select>
      </li>
      <li>
        <input v-model="filter" class="form-control" placeholder="Filter jobs by title">
      </li>
      <li v-if="page">Jump to page
        <select v-model="page">
          <option v-for="n in pages" v-bind:value="n">{{n}}</option>
        </select>
      </li>
    </ul>
    <table class="listings">
      <tr>
        <th v-bind:class="key" v-if="columns.includes(key)" v-for="(value, key) in listings[0]">
          <a href="#" v-on:click="sortBy(key)">{{key}}</a>
        </th>
      </tr>
      <tbody>
        <tr v-for="listing in filteredAndSortedListings" v-on:click="navigateToJob(listing.id)">
          <td v-bind:class="key" v-if="columns.includes(key) && key == 'createdon'" v-for="(value, key) in listing">{{date(value)}}</td>
          <td v-bind:class="key" v-else-if="columns.includes(key) && (key == 'createdby' || key == 'assignedto') && value > 0">{{nameFromId(value)}}</td>
          <td v-bind:class="key" v-else-if="columns.includes(key) && (key == 'status_id' ) && value > 0">{{statusFromCode(value)}}</td>
          <td v-bind:class="key" v-else-if="columns.includes(key)">{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      currentstatus: 2,
      perpage: false,
      filter: '',
      page: false,
      sortKey: 'createdon',
      reverse: false,
      columns: ['id', 'title', 'createdby', 'createdon', 'assignedto', 'status_id'],
    }
  },
  computed: {
    pages: function() {
      if(this.listings.length > 0) {
        var total = (this.listings[0].id / this.perpage);
        return Math.ceil(total);
      } else {
        return 1;
      }
    },
    statuses: function() {
      return this.$store.state.statuses;
    },
    listings: function() {
      return this.$store.state.listings;
    },
    filteredAndSortedListings: function () {
      let result = this.$store.state.listings;
      let searchfilter = false;
      if(this.filter) {
         searchfilter = this.filter.toLowerCase();
      }
      let searchstatus = this.currentstatus;
      console.log(this.currentstatus);
      //We now iterate over each item and match against each filter/category etc
      result = result.filter(function(item){
        let title = item.title.toLowerCase();
        if((item.status_id == searchstatus || searchstatus == 0) && (searchfilter == false || title.includes(searchfilter)) ){
          return true;
        } else {
          return false;
        }
      });
      return result;
    }
  },
  mounted(){
    this.updateListings()
  },
  methods: {
    navigateToJob: function(id){
      this.$router.push('job/' + id);
    },
    date: function(string){
      var date = new Date(string);
      var day = date.getMonth() + 1;
      var month = date.getMonth() + 1;
      if(day < 10) {
        day = '0' + day;
      }
      if(month < 10) {
        month = '0' + month;
      }
      return day + '/' + month + '/' + date.getFullYear().toString().substr(2,2);
    },
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
    },
    updateListings: function(){
      var filter = {
      }
      this.$store.dispatch('listings', filter)
    },
    nameFromId: function(id){
      let user = this.$store.state.users[id];
      return user.firstname + ' ' + user.lastname;
    },
    statusFromCode: function(code){
      return this.$store.state.statuses[code].description;
    }
  },
  watch: {
    page: function() {
      this.updateListings()
    }
  }
}
</script>
