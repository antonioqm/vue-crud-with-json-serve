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
          class="pa-10"
        >
        <Form v-on:new-person="newPerson"/>
         <ListPerson :people="people" />
        </v-sheet>
      </v-col>
       <!-- <router-view /> -->
    </v-row>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import ListPerson from "@/components/ListPerson.vue"
  import Form from '@/components/Form.vue'
  import { getPeson } from '@/http/api.js'

  export default Vue.extend({
      components : {
        ListPerson,
        Form
      },
      data () {
      return {
        people: []
      }
    },
      async mounted () {
        this.people = await getPeson()
      },
      methods: {
        newPerson(person){
          this.people.unshift(person)
          console.log("id do novo", person)
        }
      }
  })
</script>

<style scoped>

</style>