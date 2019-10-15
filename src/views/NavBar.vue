<template>
  <!-- display the navigation bar -->
  <v-toolbar>
    <v-toolbar-items>
      <v-btn tag="span" style="cursor: pointer" @click="$router.push('/homeUser')">VUE USERS DEPENDENCY</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <!-- navigation bar links -->
    <v-toolbar-items class="hidden-xs-only" v-if="!userLogedIn">
      <v-btn v-for="item in items" :key="item.title" :to="item.link">{{item.title}}</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <!-- sign out button -->
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn @click="$router.push('/dependencyRegister')">Dependency Register</v-btn>
      <v-btn @click="$router.push('/users')">Users List</v-btn>
      <v-btn @click="$router.push('/dependencies')">Dependency List</v-btn>
      <v-btn @click="logoutFromFirebase">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    items() {
      let menuItems = [
        {
          title: "Register",
          link: "/register"
        },
        {
          title: "Login",
          link: "/login"
        }
      ];
      return menuItems;
    },
    userLogedIn() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logoutFromFirebase() {
      this.$store.dispatch("signOutAction");
    }
  }
};
</script>