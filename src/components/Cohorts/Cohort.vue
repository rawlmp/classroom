<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs 10>
        <v-card>
          <v-card-title>
            <h3 class="red--text">{{ cohort.title }} - {{ cohort.num }}</h3>
          </v-card-title>
          <!-- <v-img
            :src="cohort.imageUrl"
            height="100px"
          ></v-img> -->
          <v-card-text>
            <div class="info--text">{{ cohort.date }} - {{ cohort.city }}</div>
            <div>
              {{ cohort.description }}
            </div>
          </v-card-text>
          <v-card-actions v-if="user">
            <v-spacer></v-spacer>
            <v-btn
              class="red"
              :to="'/cohort/editCohort/' + cohort.id "
              dark
              fab>
              <v-icon dark>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable */
  export default {
    props: ['id'],
    computed: {
      cohort () {
        return this.$store.getters.loadedCohort(this.id)
      },
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style lang="css">
</style>
