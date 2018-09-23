<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new Cohort</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="oncreateCohort">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                color="red"
                name="title"
                label="Program"
                id="title"
                v-model="title"
                :items="programs"
                :rules="[rules.required]"
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
                :rules="[rules.required]"
                hint="For example, 107"
              ></v-text-field>
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
            ></v-select>
            </v-flex>
          </v-layout>

          <!-- <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                color="red"
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout> -->

          <!-- <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200">
            </v-flex>
          </v-layout> -->

          <v-layout row>
            <v-flex xs12 sm6 offset-sm4>
              <h3>Starting date</h3>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm4>
              <v-date-picker
                v-model="date"
                :reactive=true
                color="red"
                :rules="[rules.required]"
                ></v-date-picker>
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
</template>

<script>
export default {
  data(){
    return{
      title: "",
      city: "",
      num: "",
      date: "",
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
    }
  },
  methods:{
    oncreateCohort(){
      if(!this.formIsValid){
        return
      }
      let cohortData = {
        title: this.title,
        city: this.city,
        num: this.num,
        description: this.description,
        date: this.date
      }
      this.$store.dispatch("createCohort", cohortData)
      this.$router.push("/cohorts")
    }
  }
}
</script>

<style lang="css">
</style>
