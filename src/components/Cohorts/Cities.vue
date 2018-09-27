<template lang="html">
  <v-container>
    <v-layout v-for="city in cities" :key="city" row wrap>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
        <v-btn block dark large :to="'/cohorts/' + city" class="red mt-4 mb-4" flat>{{city}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed:{
    cities(){
      return this.$store.getters.cities
    }
  }
}
</script>

<style lang="css">
</style>
