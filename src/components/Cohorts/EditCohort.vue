<template>
  <v-container>
    <v-layout row v-if="alert">
      <v-flex xs12>
        <v-container fluid>
          <alert text="Cohort Updated" type="success"></alert>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 align-center>
      <form @submit.prevent="updateCohort">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-select
              v-model="title"
              :items="programs"
              id="title"
              label="Program"
              color="red"
              outline
              prepend-icon="computer"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              color="red"
              name="num"
              label="Numeration"
              id="num"
              v-model="num"
              outline
              prepend-icon="format_list_numbered"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-select
              v-model="city"
              :items="cities"
              label="City"
              id="city"
              outline
              prepend-icon="location_city"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Picker a date"
                prepend-icon="event"
                readonly
                outline
              ></v-text-field>
              <v-date-picker
                v-model="date"
                color="red"
                scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="red" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              color="red"
              name="schedule"
              label="Schedule"
              id="schedule"
              v-model="schedule"
              outline
              prepend-icon="schedule"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              color="red"
              name="slack"
              label="Slack"
              id="slack"
              v-model="slack"
              outline
              prepend-icon="chat"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm12 id="buttons" class="mt-3 text-xs-center text-sm-right">
            <v-btn
              type="submit"
              class="green editButtons"
              width="200"
              dark
              >Update
              <v-icon>update</v-icon>
            </v-btn>
            <v-btn
              type="submit"
              class="red editButtons"
              width="200"
              dark
              :to="'/students/' + this.id"
            >Students
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'editCohort',
    props:['id'],
    data(){
      return {
        title: "",
        city: "",
        num: "",
        date: "",
        schedule: "",
        slack: "",
        modal: false,
        alert: false
      }
    },
    created(){
      this.title = this.cohort.title
      this.city = this.cohort.city
      this.num = this.cohort.num
      this.date = this.cohort.date
      this.slack = this.cohort.slack
      this.schedule = this.cohort.schedule
    },
    computed:{
      cohort(){
        return this.$store.getters.loadedCohort(this.id)
      },
      programs(){
        return this.$store.getters.availablePrograms
      },
      cities(){
        return this.$store.getters.availableCities
      }
    },
    methods:{
      updateCohort(){
        let updatedCohort = {
          title: this.title,
          city: this.city,
          num: this.num,
          date: this.date,
          slack: this.slack,
          schedule: this.schedule,
          id: this.id
        }
        this.$store.dispatch("updateCohort", updatedCohort)
          .then(() => {
            this.alert = true
          })
        // this.$router.push('/cohort/' + this.id)
      }
    }
  }
</script>

<style scoped>
  #buttons{
    display: flex;
    justify-content: center;
  }

  .editButtons{
    width: 120px;
  }
</style>
