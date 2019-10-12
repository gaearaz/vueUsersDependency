<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search"></v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    search: "",
    headers: [
      {
        text: "Name",
        value: "name"
      },
      { text: "Last Name", filterable: false, value: "lastName" },
      { text: "Email", filterable: false, value: "email" },
      { text: "Valid To", filterable: false, value: "valid_to" },
      { text: "Status", filterable: false, value: "active" },
      { text: "Dependency", value: "dependency" }
    ]
  }),
  computed: {
    ...mapState({
      users: state => state.users
    })
  },
  methods: {
    getUsersWithFirebase() {
      this.$store.dispatch("getUsers");
    }
  },
  mounted() {
    this.getUsersWithFirebase();
    window.console.log("Llega!")
  }
};
</script>