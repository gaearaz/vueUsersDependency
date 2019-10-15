<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :rules="passwordRules"
            label="Confirm Password"
            required
          ></v-text-field>

          <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name" required></v-text-field>

          <!-- <v-text-field v-model="dependency" label="Dependency" required></v-text-field> -->

          <v-select v-model="dependency" :items="dependenciesName" label="Dependency" solo></v-select>

          <v-btn :disabled="!valid" color="success" @click="validate">Register</v-btn>

          <v-btn color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [v => !!v || "Password and Confirm password Required"],
    name: "",
    lastName: "",
    dependency: "",
    valid_to: "Always",
    active: false,
    nameRules: [v => !!v || "Name is required"],
    lastNameRules: [v => !!v || "Last Name is required"]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.registerWithFirebase();
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
      let ran = Math.ceil(Math.random() * 1000000);
        
      const user = {
        id: "" + ran,
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        dependency: this.dependency,
        valid_to: "Always",
        active: "inactive"
      };
      this.$store.dispatch("signUpAction", user);
    }
  },
  mounted() {
    this.getDependenciesWithFirebase();
  },
  computed: {
    ...mapState({
      dependenciesName: state => state.dependenciesName
    })
  }
};
</script>