<template lang="html">
  <v-container>
    <v-layout v-for="program in programs" :key="program" row wrap>
      <v-flex xs12 sm12 class="text-xs-center">
        <v-btn block dark large :to="'/cohorts/' + city + '/' + program" class="red mt-4 mb-4" flat>{{program}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:['city'],
  computed:{
    programs(){
      return this.$store.getters.programs
    }
  }
}
</script>

<style lang="css">
</style>
