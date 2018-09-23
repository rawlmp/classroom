/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedCohorts: [],
    availableCities: ["Amsterdam", "Barcelona", "Berlin", "Madrid", "Munich"],
    availablePrograms: ["Data", "Java"],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setCohorts(state, payload) {
      state.loadedCohorts = payload
    },
    createCohort(state, payload) {
      state.loadedCohorts.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    loadCohorts({
      commit
    }) {
      commit('setLoading', true)
      firebase.database().ref('cohorts').once("value")
        .then(data => {
          let cohorts = []
          let obj = data.val()
          for (let key in obj) {
            cohorts.push({
              id: key,
              title: obj[key].title,
              num: obj[key].num,
              date: obj[key].date,
              city: obj[key].city,
            })
          }
          commit("setCohorts", cohorts)
          commit('setLoading', false)
        });
    },
    createCohort({
      commit
    }, payload) {
      let cohort = {
        title: payload.title,
        num: payload.num,
        city: payload.city,
        date: payload.date.toString()
      }
      firebase.database().ref('cohorts').push(cohort)
        .then(data => {
          commit("createCohort", { ...cohort,
            id: data.key
          })

        })
        .catch()
    },
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredCohorts: []
            }
            commit("setUser", newUser)
            commit('setLoading', false)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredCohorts: []
            }
            commit("setUser", newUser)
            commit('setLoading', false)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    clearError({
      commit
    }) {
      commit('clearError')
    }
  },
  getters: {
    loadedCohorts(state) {
      return state.loadedCohorts.sort((cohortA, cohortB) => {
        return cohortA.date < cohortB.date
      })
    },
    featuredCohorts(state, getters) {
      return getters.loadedCohorts.slice(0, 5)
    },
    loadedCohort(state) {
      return (cohortId) => {
        return state.loadedCohorts.find(cohort => {
          return cohort.id === cohortId
        })
      }
    },
    javaCohorts(state) {
      return state.loadedCohorts.filter(cohort => cohort.title === "Java")
    },
    dataCohorts(state) {
      return state.loadedCohorts.filter(cohort => cohort.title === "Data")
    },
    cityCohorts(state) {
      return (cohortCity, cohortTitle) => {
        return state.loadedCohorts.filter(cohort => {
          return cohort.city === cohortCity && cohort.title === cohortTitle
        }).sort((cohortA, cohortB) => {
          return cohortA.num > cohortB.num
        })
      }
    },
    cities(state) {
      return [...new Set(state.loadedCohorts.map(cohort => cohort.city).sort())]
    },
    programs(state) {
      return [...new Set(state.loadedCohorts.map(cohort => cohort.title).sort())]
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
    availableCities(state) {
      return state.availableCities.sort()
    },
    availablePrograms(state) {
      return state.availablePrograms.sort()
    }
  }
});