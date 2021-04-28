<template>
  <v-container class="d-flex justify-center align-center"   style="height:100%">
    <v-row >
      <v-col 
        cols="12"
        sm="12"
      >
        <v-sheet
          rounded="lg"
          min-height="268"
        >
         <ListPerson/>
        </v-sheet>
      </v-col>
       <!-- <router-view /> -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ListPerson from "./ListPerson.vue"

  export default Vue.extend({
      components : {
        ListPerson
      }
  })
</script>

<style scoped>

</style>