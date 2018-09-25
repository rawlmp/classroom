<template>
  <v-app>
    <v-navigation-drawer app v-model="sideNav">
      <v-list>
        <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="red">
      <v-toolbar-side-icon class="hidden-sm-and-up"@click="sideNav = true"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor:pointer">Ubiqum Cohort Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat @click="onLogout" v-if="userIsAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  data () {
    return {
      sideNav: false
    }
  },
  computed:{
    menuItems(){
      let menuItems = [
        // {icon: "face" , title: "Sign up", link:"/signup"},
        {icon: "lock_open" , title: "Log in", link:"/signin"}
      ]

      if(this.userIsAuthenticated){
        menuItems = [
          {icon: "supervisor_account" , title: "By date", link:"/cohorts"},
          {icon: "location_city" , title: "By city", link:"/cities"},
          {icon: "add" , title: "Add New", link:"/createcohort"},
          {icon: "person" , title: "You", link:"/user"}
        ]
      }

      return menuItems;
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.fade-enter-active{
  transition: opacity .7s;
}

.fade-leave-active {
  transition: opacity 0;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
