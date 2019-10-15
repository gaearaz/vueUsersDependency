<template>
  <v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Coordinator</th>
            <th class="text-left">Location</th>
            <th class="text-left">Max number of users</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dependency in dependencies" v-bind:key="dependency.id">
            <td>{{dependency.name}}</td>
            <td>{{dependency.coordinator}}</td>
            <td>{{dependency.location}}</td>
            <td>{{dependency.maxNumUsers}}</td>
            <td>{{dependency.active}}</td>
            <td>
              <v-btn small color="primary" @click="editProcess(dependency)">Edit</v-btn>
              <v-btn small color="error" @click="deleteDependencyWithFirebase(dependency)">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :disabled="editing"
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              :disabled="editing"
              v-model="coordinator"
              :rules="coordinatorRules"
              label="Coordinator"
              required
            ></v-text-field>

            <v-text-field
              :disabled="editing"
              v-model="location"
              :rules="locationRules"
              label="Location"
              required
            ></v-text-field>

            <v-text-field
              :disabled="editing"
              type="number"
              v-model="maxNumUsers"
              :rules="maxNumUsersRules"
              label="Maximum number of users"
              required
            ></v-text-field>

            <v-select :disabled="editing" v-model="active" :items="statusArr" label="Status" solo></v-select>

            <v-btn :disabled="!valid || editing" color="success" @click="validate">Edit</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    id: "",
    editing: true,
    valid: true,
    location: "",
    locationRules: [v => !!v || "Location is required"],
    name: "",
    coordinator: "",
    maxNumUsers: "",
    // eslint-disable-next-line
    maxNumUsersRules: [
      v =>
        /(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]/.test(v) ||
        "Max number of user must be valid"
    ],
    active: "",
    nameRules: [v => !!v || "Name is required"],
    coordinatorRules: [v => !!v || "Coordinator is required"],
    statusArr: ["active", "inactive"]
  }),
  computed: {
    ...mapState({
      dependencies: state => state.dependencies
    })
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.editWithFirebase();
        this.reset();
        this.editing = true;
        this.getDependenciesWithFirebase();
      }
    },

    getDependenciesWithFirebase() {
      this.$store.dispatch("getDependencies");
    },

    reset() {
      this.$refs.form.reset();
    },

    editWithFirebase() {
      const dep = {
        id: this.id,
        name: this.name,
        coordinator: this.coordinator,
        location: this.location,
        active: this.active,
        maxNumUsers: this.maxNumUsers
      };
      this.$store.dispatch("editDepedencyAction", dep);
    },

    deleteDependencyWithFirebase(payload) {
      this.$store.dispatch("deleteDependencyAction", payload);
      this.getDependenciesWithFirebase();
    },

    editProcess(payload) {
      this.editing = false;
      this.id = payload.id;
      this.name = payload.name;
      this.coordinator = payload.coordinator;
      this.active = payload.active;
      this.location = payload.location;
      this.maxNumUsers = payload.maxNumUsers;
    }
  },
  mounted() {
    this.getDependenciesWithFirebase();
  }
};
</script>