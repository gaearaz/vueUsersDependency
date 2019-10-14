<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :rules="nameRules" label="Dependency Name" required></v-text-field>

          <v-text-field
            v-model="coordinator"
            :rules="coordinatorRules"
            label="Coordinator"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="maxNumUsers"
            :rules="maxNumUsersRules"
            label="Maximum number of users"
            required
          ></v-text-field>

          <v-text-field v-model="location" :rules="locationRules" label="Location" required></v-text-field>

          <!-- <v-text-field v-model="active" :rules="activeRules" label="Status" required></v-text-field> -->

          <v-select v-model="active" :items="itemsStatus" label="Status" solo></v-select>

          <v-btn :disabled="!valid" color="success" @click="validate">Register</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    itemsStatus: ['available','unavailable' ],
    valid: true,
    name: "",
    nameRules: [v => !!v || "Dependecy's name is required"],

    coordinator: "",
    coordinatorRules: [v => !!v || "Coordinator's name is required"],

    maxNumUsers: "",
    // eslint-disable-next-line
    maxNumUsersRules: [v=> /(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]/.test(v) || "E-mail must be valid"],

    active: "",
    activeRules: [v => !!v || "Status Required"],

    location: "",
    locationRules: [v => !!v || "Location is required"]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.registerWithFirebase();
      }
    },

    reset() {
      this.$refs.form.reset();
    },

    registerWithFirebase() {
      const dependency = {
        name: this.name,
        coordinator: this.coordinator,
        maxNumUsers: this.maxNumUsers,
        location: this.location,
        active: this.active
      };
      this.$store.dispatch("addDependencyAccion", dependency);
    }
  }
};
</script>