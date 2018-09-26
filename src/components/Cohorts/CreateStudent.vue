<template>
  <v-container>
    <v-card class="pa-2">
      <form>
        <v-layout row wrap>
          <v-card-text>
            <div>
              <h4>Student Info</h4>
            </div>
          </v-card-text>
          <v-flex xs6 offset-xs3 offset-sm0 sm3 class="pa-2">
            <v-avatar
              size="150"
              color="red">
              <img src="http://imeb.com.br/wp-content/uploads/2018/08/avatar-default.png" alt="avatar">
            </v-avatar>
          </v-flex>
            <v-flex xs12 sm5 class="pa-2">
              <v-text-field
                color="red"
                name="name"
                label="Name"
                id="name"
                append-icon="face"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 class="pa-2">
              <v-text-field
                color="red"
                name="email"
                label="Email"
                id="email"
                append-icon="email"
              ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-card-text>
            <div>
              <h4>Cohort Info</h4>
            </div>
          </v-card-text>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="title"
              label="Program"
              id="title"
              v-model="inputs.program"
              append-icon="computer"
              disabled
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="num"
              label="Number"
              v-model="inputs.number"
              id="num"
              append-icon="format_list_numbered"
              disabled
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="city"
              label="City"
              v-model="inputs.city"
              id="city"
              append-icon="location_city"
              disabled
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-card-text>
            <div>
              <h4>Social Links</h4>
            </div>
          </v-card-text>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="github"
              label="Github Profile"
              id="github"
              append-icon="turned_in_not"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="linkedin"
              label="LinkedIn"
              id="linkedin"
              append-icon="turned_in_not"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pa-2">
            <v-text-field
              color="red"
              name="slack"
              label="Slack"
              id="slack"
              append-icon="turned_in_not"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-card-text>
            <div>
              <h4>Projects Url's</h4>
            </div>
          </v-card-text>
          <v-flex xs12 sm3 class="pa-2">
            <v-text-field
              color="red"
              name="mod1"
              label="Module 1"
              id="mod1"
              append-icon="language"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pa-2">
            <v-text-field
              color="red"
              name="mod2"
              label="Module 2"
              id="mod2"
              append-icon="language"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pa-2">
            <v-text-field
              color="red"
              name="mod3"
              label="Module 3"
              id="mod3"
              append-icon="language"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pa-2">
            <v-text-field
              color="red"
              name="mod4"
              label="Module 4"
              id="mod4"
              append-icon="language"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-card-text>
            <div>
              <h4>Skills - Overall: <span class="overall">{{overallSkills}}</span></h4>
            </div>
          </v-card-text>
          <v-flex v-for="(slider, i) in sliders" :key="i" xs10 offset-xs1 offset-sm0 sm6 class="pa-2">
            <v-subheader class="pl-0">{{slider.text}}</v-subheader>
            <v-card-text class="pt-0">
              <v-slider
                v-model="slider.initialValue"
                :rules="rules"
                max="10"
                step="1"
                thumb-label="always"
              ></v-slider>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs4 offset-xs4>
            <v-btn
            dark
            class="red">
              Add Student
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'createStudent',
    props:['id'],
    data () {
      return {
        inputs: {
          name:"",
          email:"",
          program:"",
          city:"",
          date:"",
          number:""
        },
        sliders: [
          {
            text: "Html",
            initialValue: 0
          }, {
            text: "CSS",
            initialValue: 0
          }, {
            text: "JavaScript",
            initialValue: 0
          }, {
            text: "Java",
            initialValue: 0
          }
        ],
        rules: [
          v => v >= 5 || ''
        ]
      }
    },
    created(){
      this.inputs.program = this.cohort.title
      this.inputs.city = this.cohort.city
      this.inputs.number = this.cohort.num
    },
    computed:{
      overallSkills(){
        return this.sliders.reduce((sum,{ initialValue }) => sum + initialValue , 0) / this.sliders.length
      },
      cohort(){
        return this.$store.getters.loadedCohort(this.id)
      }
    }
  }
</script>

<style scoped>

  .flex.pa-2.xs6.offset-xs3.offset-sm0.sm3{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex.pa-2.xs12.sm5{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex.pa-2.xs12.sm4{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overall{
    font-weight: normal;
    color: blue;
    font-size: 20px;
    padding-left: 20px;
  }

</style>
