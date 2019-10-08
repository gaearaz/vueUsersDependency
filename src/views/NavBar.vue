<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn flat tag="span" style="cursor: pointer">VUE USERS DEPENDENCY</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in items" :key="item.title" :to="item.link">{{item.title}}</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat>Logout</v-btn>
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
          icon: "face",
          link: "/register"
        },
        {
          title: "Login",
          icon: "no_encryption",
          link: "/login"
        }
      ];
      return menuItems;
    }
  }
};
</script>