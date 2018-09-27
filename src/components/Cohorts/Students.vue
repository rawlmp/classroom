<template>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-list subheader>
            <v-subheader v-if="students != undefined" inset class="pt-2 mb-2">Students in {{cohort.title}} {{cohort.num}} {{cohort.city}}</v-subheader>


            <v-list-tile
              v-if="cohort.students != undefined"
              class="mt-2"
              v-for="(student, i) in students"
              :key="i"
              avatar
              :to="`/editStudent/${id}/${student.studentId}`"
            >
              <v-list-tile-avatar>
                <v-icon large>face</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ student.studentName }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple large>
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile
              v-if="students.length == 0"
              avatar
              class="mt-2">
              <v-list-tile-avatar>
                <v-icon>face</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>No students</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="red">error</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

          </v-list>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 offset-xs3>
          <v-flex xs12 sm6 class="mt-3 text-xs-center text-sm-left">
            <v-btn
              type="button"
              class="red"
              dark
              :to="'/createStudent/' + this.id"
            >Create New Student
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Students',
    props:['id'],
    data(){
      return{

      }
    },
    computed:{
      cohort(){
        return this.$store.getters.loadedCohort(this.id)
      },
      students(){
        return this.$store.getters.students(this.id)
      }
    }
  }
</script>

<style scoped>
  .flex.xs6.offset-xs3{
    display: flex;
    justify-content: center;
  }

</style>
