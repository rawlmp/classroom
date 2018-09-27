<template lang="html">
  <v-container>
    <v-layout row v-if="!user">
      <v-flex xs12>
        <v-container fluid>
          <alert text="Login to create Cohorts" type="error"></alert>
        </v-container>
      </v-flex>
    </v-layout>
    <v-container v-if="user">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new Cohort</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateCohort">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                color="red"
                name="title"
                label="Program"
                id="title"
                v-model="title"
                :items="programs"
                prepend-icon="computer"
                :rules="[rules.required]"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="num"
                color="red"
                label="Program Number"
                id="num"
                v-model="num"
                :readonly="true"
                :rules="[rules.required]"
                prepend-icon="format_list_numbered"
                hint="Use the Slider"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row class="mt-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-slider
                prepend-icon="format_list_numbered"
                v-model="num"
                thumb-color="red"
                min="101"
                max="120"
                thumb-size="50"
                tick-size="5"
                color="red"
                :rules="[rules.required]"
              ></v-slider>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
              v-model="city"
              :rules="[rules.required]"
              :items="cities"
              color="red"
              label="City"
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
                  label="Starting Date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="date"
                  :rules="[rules.required]"
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
                name="schedule"
                color="red"
                label="Google Schedule"
                id="schedule"
                v-model="schedule"
                prepend-icon="schedule"
                hint="Google Doc Url"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="slack"
                color="red"
                label="Slack Group"
                id="slack"
                v-model="slack"
                prepend-icon="chat"
                hint="Slack group Url"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm5 class="mt-3">
              <v-btn
                type="submit"
                class="red"
                dark
                :disabled="!formIsValid">Create Cohort</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      title: "",
      city: "",
      num: 101,
      date: "",
      schedule: "",
      slack:"",
      modal: false,
      rules: {
          required: value => !!value || 'Required.'
      },
    }
  },
  computed:{
    formIsValid(){
      return this.title !== "" && this.city !== "" && this.num !== "" && this.date !== ""
    },
    cities(){
      return this.$store.getters.availableCities
    },
    programs(){
      return this.$store.getters.availablePrograms
    },
    user(){
      return this.$store.getters.user
    }
  },
  methods:{
    onCreateCohort(){
      if(!this.formIsValid){
        return
      }
      let cohortData = {
        title: this.title,
        city: this.city,
        num: this.num,
        description: this.description,
        date: this.date,
        schedule: this.schedule,
        slack: this.slack
      }
      this.$store.dispatch("createCohort", cohortData)
      this.$router.push("/cohorts")
    }
  }
}
</script>

<style lang="css">
</style>
