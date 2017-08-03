<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img src="./../../static/logo.png" v-on:click="navigateToJob(listing.id)" />
      </router-link>
    </header>
    <router-view></router-view>
  </div>
</template>
