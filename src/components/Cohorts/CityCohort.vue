<template lang="html">
  <v-container>
    <v-layout row wrap v-if="cohorts.length == 0">
      <v-flex xs12 sm10 offset-sm1>
        <v-container fluid>
          <alert text="No cohorts yet"></alert>
        </v-container>
      </v-flex>
      <v-flex xs4 offset-xs4>
        <v-btn class="red" dark @click="goBack">
          Go Back
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 lg4 v-for="cohort in cohorts" :key="cohort.id" class="my-3">
        <v-card>
          <v-container fluid>
            <v-layout>
              <v-flex xs5 sm4 md3>
                <!--<v-img-->
                  <!--src="https://pbs.twimg.com/profile_images/918106915795763200/Z0QK7_ej_400x400.jpg"-->
                  <!--width="100px"-->
                <!--&gt;</v-img>-->
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                    <div>
                      <h3>{{cohort.title}} - {{cohort.num}}</h3>
                      <div>{{cohort.city}}</div>
                      <div>{{cohort.date}}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn class="red" dark :to="'/cohort/' + cohort.id">
                      <v-icon>arrow_forward</v-icon>
                      View Cohort
                    </v-btn>
                  </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:['city', 'program'],
  computed:{
    cohorts(){
      return this.$store.getters.cityCohorts(this.city, this.program);
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css">
  .flex.xs4.offset-xs4{
    display: flex;
    justify-content: center;
  }

</style>
