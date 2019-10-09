import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        user: null,
        status: null,
        error: null

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
        }

    },
    actions: {
        signUpAction({ commit }, payload) {
            commit('setStatus', 'loading')
            // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            firebase.firestore().collection("Users").doc(payload.email).set(payload)
                .then((response) => {
                    alert('success')
                    commit('setUser', payload.email)
                    commit('setStatus', 'success')
                    commit('setError', null)
                })
                .catch((error) => {
                    alert('failure')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })

            // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            //     .then((response) => {
            //         alert('success')
            //         // response will have user
            //         // user will have uid will be updated to the state
            //         commit('setUser', response.user.uid)
            //         commit('setStatus', 'success')
            //         commit('setError', null)
            //     })
            //     .catch((error) => {
            //         commit('setStatus', 'failure')
            //         commit('setError', error.message)
            //     })


        },

        signInAction({ commit }, payload) {
            firebase.firestore().collection("Users").doc(payload.email).get().then(doc => {
                if (doc.exists) {
                    window.console.log("Document data:", doc.data());
                    alert('Loggin!')
                    commit('setUser', payload.email)
                    commit('setStatus', 'success')
                    commit('setError', null)
                } else {
                    // doc.data() will be undefined in this case
                    window.console.log("No such document!");
                }
            }).catch((error) => {
                window.console.log("Error getting document:", error);
                alert('failure')
                commit('setStatus', 'failure')
                commit('setError', error.message)
            });
        },

        signOutAction({ commit }) {
            firebase.auth().signOut()
                .then((response) => {
                    commit('setUser', null)
                    commit('setStatus', 'success')
                    commit('setError', null)
                })
                .catch((error) => {
                    commit('setStatus', 'failure')
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
        }
    }
})