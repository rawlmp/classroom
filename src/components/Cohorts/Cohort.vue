<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-title>
            <h3 class="red--text">{{ cohort.title }} - {{ cohort.num }}</h3>
          </v-card-title>
          <v-img
            src="https://static1.squarespace.com/static/54aede61e4b0861e7da106f9/54b5404ae4b0177640af2f9c/54b5404ee4b05235bedc87ec/1458068411417/View_Ext.jpg"
            height="200px"
          ></v-img>
          <v-card-text>
            <div class="info--text">{{ cohort.date }} - {{ cohort.city }}</div>
            <div>
              {{ cohort.description }}
            </div>
          </v-card-text>
          <v-flex xs6 offset-xs3>
            <p v-if="!cohort.students">No Students yet</p>
            <p v-else v-for="student in cohort.students">{{student.studentName}}</p>
          </v-flex>
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
