<template lang="html">
  <transition name="fade">
    <v-alert
        @input="onClose"
        dismissible
        type="error"
        :value="true"
      >
        {{ text }}
    </v-alert>
  </transition>
</template>

<script>
export default {
  props:['text'],
  methods:{
    onClose(){
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="css" scoped>
.fade-enter-active{
  transition: opacity .7s;
}

.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
