<template lang="html">
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 sm6 offset-sm3>
        <h3>Updating Cohorts...</h3>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs10 offset-xs1 sm8 offset-sm2 v-for="cohort in cohorts" :key="cohort.id" class="my-2">
        <v-list>
          <v-container fluid>
            <v-layout>
              <v-flex xs12 sm12>
                <v-list-tile
                  class="mt-2"
                  avatar
                >
                  <v-list-tile-avatar>
                    <v-icon large>computer</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title><h3>{{cohort.title}} - {{cohort.num}}</h3></v-list-tile-title>
                    <v-list-tile-title>{{cohort.city}}</v-list-tile-title>
                    <v-list-tile-title><small>{{cohort.date}}</small></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple large :to="'/cohort/' + cohort.id">
                      <v-icon color="blue">remove_red_eye</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

              </v-flex>
            </v-layout>
          </v-container>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    cohorts () {
      return this.$store.getters.loadedCohorts
    },
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="css">

</style>
