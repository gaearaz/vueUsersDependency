<template>
  <v-app>
    <nav-bar></nav-bar>
    <router-view></router-view>
    
    
  </v-app>
</template>

<script>
import NavBar from "../src/views/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
