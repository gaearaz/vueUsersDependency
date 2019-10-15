/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { router } from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        user: null,
        status: null,
        error: null,

        users: [],
        dependencies: [],
        dependenciesName: []
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
        },

        setDepedencies(state, payload) {
            state.dependencies = payload
        },
        setDepedenciesName(state, payload) {
            state.dependenciesName = payload
        }
    },
    actions: {
        editUserAction({ commit }, payload) {
            firebase.firestore().collection("Users").doc(payload.id).update({
                "name": payload.name,
                "lastName": payload.lastName,
                "email": payload.email,
                "dependency": payload.dependency,
                "valid_to": payload.valid_to,
                "active": payload.active
            }).then((response) => {
                alert('User edited successfully')
                commit('setStatus', 'success')
                commit('setError', null)
            })
                .catch((error) => {
                    alert('Failure editing user')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        deleteUserAction({ commit }, payload) {
            firebase.firestore().collection("Users").doc(payload.id).delete().then((response) => {
                alert('User deleted successfully')
                // commit('setUser', payload.email)
                commit('setStatus', 'success')
                commit('setError', null)
            })
                .catch((error) => {
                    alert('Failure delete user')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        editDepedencyAction({ commit }, payload) {
            firebase.firestore().collection("Dependency").doc(payload.id).update({
                "name": payload.name,
                "coordinator": payload.coordinator,
                "location": payload.location,
                "active": payload.active,
                "maxNumUsers": payload.maxNumUsers
            }).then((response) => {
                alert('Dependency edited successfully')
                // commit('setUser', payload.email)
                commit('setStatus', 'success')
                commit('setError', null)
            })
                .catch((error) => {
                    alert('Failure editing dependency')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        deleteDependencyAction({ commit }, payload) {
            firebase.firestore().collection("Dependency").doc(payload.id).delete().then((response) => {
                alert('Dependency deleted successfully')
                commit('setStatus', 'success')
                commit('setError', null)
            })
                .catch((error) => {
                    alert('Failure delete dependency')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },
        signUpAction({ commit }, payload) {
            commit('setStatus', 'loading')
            // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            firebase.firestore().collection("Users").doc(payload.id).set(payload)
                .then((response) => {
                    alert('Successfully registered')
                    // commit('setUser', payload.email)
                    commit('setStatus', 'success')
                    commit('setError', null)
                    router.push('login')
                })
                .catch((error) => {
                    alert('Registration failed')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },

        signInAction({ commit }, payload) {

            firebase.firestore().collection("Users").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.data().email == payload.email) {
                           
                            alert('Loggin!')
                            commit('setUser', doc.data())
                            sessionStorage.setItem('user', doc.data());
                            commit('setStatus', 'success')
                            commit('setError', null)
                            router.push('homeUser')
                        }
                    })
                }).catch((error) => {
                    alert('Login failed!')
                    commit('setStatus', 'failure')
                    alert('No such document!')
                });


        },
        signOutAction({ commit }) {
            alert('You have successfully left')
            router.push('/')
            commit('setUser', null)
            sessionStorage.removeItem('user')
            commit('setStatus', 'success')
            commit('setError', null)
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
           
        },
        getDependencies({ commit }) {
            let dependencies = []
            let dependenciesName = []
            firebase.firestore().collection("Dependency").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        dependencies.push(doc.data())
                        dependenciesName.push(doc.data().name)
                    })
                    commit('setDepedencies', dependencies)
               
                    commit('setDepedenciesName', dependenciesName)
                });
        },

        addDependencyAccion({ commit }, payload) {
            
            firebase.firestore().collection("Dependency").doc(payload.id).set(payload)
                .then((response) => {
                    alert('Dependency added successfully')
                })
                .catch((error) => {
                    alert('Failure adding dependency')
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
        },
        dependencies(state) {
            return state.dependencies
        }

    }
})