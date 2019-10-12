/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        user: null,
        status: null,
        error: null,

        users: []

    },
    mutations: {

        setUser(state, payload) {
            state.user = payload
        },

        removeUser(state) {
            state.user = null
        },

        setStatus(state, payload) {
            state.status = payload
        },

        setError(state, payload) {
            state.error = payload
        },

        setUsers(state, payload) {
            state.users = payload
        }
    },
    actions: {
        signUpAction({ commit }, payload) {
            commit('setStatus', 'loading')
            // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            firebase.firestore().collection("Users").doc(payload.email).set(payload)
                .then((response) => {
                    alert('success')
                    // commit('setUser', payload.email)
                    commit('setStatus', 'success')
                    commit('setError', null)
                    router.push('login')
                })
                .catch((error) => {
                    alert('failure')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },

        signInAction({ commit }, payload) {
            firebase.firestore().collection("Users").doc(payload.email).get().then(doc => {
                if (doc.exists) {
                    alert('Loggin!')
                    commit('setUser', doc.data())
                    commit('setStatus', 'success')
                    commit('setError', null)
                    router.push('homeUser')
                } else {
                    // doc.data() will be undefined in this case
                    window.console.log("No such document!");
                    alert('No such document!')
                }
            }).catch((error) => {
                window.console.log("Error getting document:", error);
                alert('Error getting document:')
                commit('setStatus', 'failure')
                commit('setError', error.message)
            });
        },

        signOutAction({ commit }) {
            router.push('/')
            commit('setUser', null)
            commit('setStatus', 'success')
            commit('setError', null)

            // firebase.auth().signOut()
            //     .then((response) => {
            //         commit('setUser', null)
            //         commit('setStatus', 'success')
            //         commit('setError', null)
            //     })
            //     .catch((error) => {
            //         commit('setStatus', 'failure')
            //         commit('setError', error.message)
            //     })
        },

        getUsers({ commit }) {
            let users = []
            firebase.firestore().collection("Users").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        users.push(doc.data())
                    })
                    commit('setUsers', users)

                });
            window.console.log(this.getters.users)
        },

        addDependencyAccion() {
            firebase.firestore().collection("Dependency").doc(payload.name).set(payload)
                .then((response) => {
                    alert('Dependence added successfully')
                    // router.push('login')
                })
                .catch((error) => {
                    alert('failure')
                    commit('setError', error.message)
                })
        }
    },

    getters: {
        status(state) {
            return state.status
        },

        user(state) {
            return state.user
        },

        error(state) {
            return state.error
        },
        users(state) {
            return state.users
        }
    }
})