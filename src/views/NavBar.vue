<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn  tag="span" style="cursor: pointer">VUE USERS DEPENDENCY</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn  v-for="item in items" :key="item.title" :to="item.link">{{item.title}}</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn >Logout</v-btn>
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
    }
  }
};
</script>