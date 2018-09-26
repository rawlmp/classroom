/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cohorts from '@/components/Cohorts/Cohorts'
import Cohort from '@/components/Cohorts/Cohort'
import CityCohort from '@/components/Cohorts/CityCohort'
import Cities from '@/components/Cohorts/Cities'
import Programs from '@/components/Cohorts/Programs'
import CreateStudent from '@/components/Cohorts/CreateStudent'
import CreateCohort from '@/components/Cohorts/CreateCohort'
import EditCohort from '@/components/Cohorts/EditCohort'
import Signin from '@/components/Users/Signin'
import Signup from '@/components/Users/Signup'
import User from '@/components/Users/User'
import AuthGuard from '@/router/authGuard'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'landing',
      component: Home
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cohorts',
      name: 'Cohorts',
      component: Cohorts
    }, {
      path: '/createcohort',
      name: 'CreateCohort',
      component: CreateCohort,
      beforeEnter: AuthGuard
    }, {
      path: '/createStudent/:id',
      name: 'CreateStudent',
      component: CreateStudent,
      beforeEnter: AuthGuard,
      props: true
    }, {
      path: '/cohort/:id',
      name: 'Cohort',
      props: true,
      component: Cohort
    }, {
      path: '/cohort/editCohort/:id',
      name: 'editCohort',
      props: true,
      component: EditCohort,
      beforeEnter: AuthGuard
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup
    }, {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: AuthGuard

    }, {
      path: '/cohorts/:city',
      name: 'city',
      props: true,
      component: Programs,
      beforeEnter: AuthGuard

    }, {
      path: '/cohorts/:city/:program',
      name: 'CityCohort',
      props: true,
      component: CityCohort,
      beforeEnter: AuthGuard

    }, {
      path: '/cities',
      name: 'cities',
      component: Cities,
      beforeEnter: AuthGuard
    }
  ],
  mode: "history"
})
