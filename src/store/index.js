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
                alert('success')
                // commit('setUser', payload.email)
                commit('setStatus', 'success')
                commit('setError', null)
            })
                .catch((error) => {
                    alert('failure')
                    commit('setStatus', 'failure')
                    commit('setError', error.message)
                })
        },

        signUpAction({ commit }, payload) {
            commit('setStatus', 'loading')
            // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            firebase.firestore().collection("Users").doc(payload.id).set(payload)
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
            
            firebase.firestore().collection("Users").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.data().email == payload.email) {
                            window.console.log(doc.data().email)
                            alert('Loggin!')
                            commit('setUser', doc.data())
                            commit('setStatus', 'success')
                            commit('setError', null)
                            router.push('homeUser')
                        }
                    })
                }).catch((error) => {
                    window.console.log("No such document! or Error getting document");
                    commit('setStatus', 'failure')
                    alert('No such document!')
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
                    window.console.log(dependenciesName)
                    commit('setDepedenciesName', dependenciesName)

                });
        },
        // getDependenciesName({ commit }) {
        //     let dependenciesName = []
        //     this.state.dependencies.forEach(element => {
        //         dependenciesName.push(element.name)
        //     });
        //     window.console.log(dependenciesName)
        //     commit('setDepedenciesName', dependenciesName)

        // }


        addDependencyAccion({ commit }, payload) {
            window.console.log(payload)
            firebase.firestore().collection("Dependency").doc(payload.id).set(payload)
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
        },
        dependencies(state) {
            return state.dependencies
        }

    }
})