<template>
  <v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Dependency</th>
            <th class="text-left">Valit to</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
            <td>{{user.dependency}}</td>
            <td>{{user.valid_to}}</td>
            <td>{{user.active}}</td>
            <td>
              <v-btn small color="primary" @click="editProcess(user)">Edit</v-btn>
              <v-btn small color="error" @click="deleteUserWithFirebase(user)">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- <v-card-title>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search"></v-data-table>-->
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :disabled="editing"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              :disabled="editing"
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              :disabled="editing"
              v-model="lastName"
              :rules="lastNameRules"
              label="Last Name"
              required
            ></v-text-field>

            <v-select
              :disabled="editing"
              v-model="dependency"
              :items="dependenciesName"
              label="Dependency"
              solo
            ></v-select>

            <v-text-field :disabled="editing" v-model="valid_to" label="Valid to" required></v-text-field>

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
    idUser: "",
    editing: true,
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    name: "",
    lastName: "",
    dependency: "",
    valid_to: "",
    active: "",
    nameRules: [v => !!v || "Name is required"],
    lastNameRules: [v => !!v || "Last Name is required"],
    statusArr: ["active", "inactive"]
  }),
  computed: {
    ...mapState({
      users: state => state.users,
      dependenciesName: state => state.dependenciesName
    })
  },
  methods: {
    getUsersWithFirebase() {
      this.$store.dispatch("getUsers");
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.registerWithFirebase();
        this.reset();
        this.editing = true;
        this.getUsersWithFirebase();
        this.getDependenciesWithFirebase();
      }
    },

    getDependenciesWithFirebase() {
      this.$store.dispatch("getDependencies");
      // this.$store.dispatch("getDependenciesName");
    },

    reset() {
      this.$refs.form.reset();
    },

    registerWithFirebase() {
      const user = {
        id: this.idUser,
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        valid_to: this.valid_to,
        active: this.active,
        dependency: this.dependency
      };
      this.$store.dispatch("editUserAction", user);
    },

    deleteUserWithFirebase(payload) {
      this.$store.dispatch("deleteUserAction", payload);
      this.getUsersWithFirebase();
    },

    editProcess(payload) {
      this.idUser = payload.id;
      this.editing = false;
      this.email = payload.email;
      this.name = payload.name;
      this.lastName = payload.lastName;
      this.dependency = payload.dependency;
      this.valid_to = payload.valid_to;
      this.active = payload.active;
    }
  },
  mounted() {
    this.getUsersWithFirebase();
    this.getDependenciesWithFirebase();
    window.console.log("Llega!");
  }
};
</script>