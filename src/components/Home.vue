<template lang="html">
  <v-container>
    <v-layout v-show="!loading" row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/cohorts" class="red--text" flat>Explore Cohorts</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn :disabled="user == null" large to="/createcohort" class="red--text">Create Cohort</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-if="loading">
      <v-flex xs12 sm6 offset-sm3>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-layout>
    <transition name="fade">
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="height: 400px;">
            <v-carousel-item
              v-for="item in cohorts"
              :key="item.id"
              src="https://picsum.photos/600/400/?random"
              @click="loadCohort(item.id)">
                <div class="title">
                  {{ item.title}}
                </div>
              </v-carousel-item>
          </v-carousel>
      </v-flex>
    </v-layout>
  </transition>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <h2 v-if="loading">Loading cohorts... Please wait.</h2>
        <p v-else>Meet our cohorts</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */

export default {
  data(){
    return{
    }
  },
  methods:{
    loadCohort(id){
      this.$router.push("/cohort/" + id)
    }
  },
  computed:{
    cohorts(){
      return this.$store.getters.featuredCohorts
    },
    loading(){
      return this.$store.getters.loading
    },
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="css" scoped>

.title{
  color: white;
  background-color: rgba(0,0,0,.5);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

v-carousel {
  cursor: pointer;
}
</style>
