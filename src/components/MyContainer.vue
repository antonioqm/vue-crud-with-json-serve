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
        <Form/>
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
  import { getPeson, removePerson } from '@/http/api.js'

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
        await this.$root.$on('new-person', this.newPerson)
        await this.$root.$on('edited-person', this.editedPerson)
        await this.$root.$on('remove-person', this.remove)
      },
      methods: {
        newPerson(person){
          this.people.unshift(person)
          console.log("id do novo", person)
        },
        editedPerson(person){
          const {id} = person;
          const index =  this.people.findIndex((person) => {
            return person.id === id
          })

          this.people.splice(index, 1, person)

        },
        async remove(person){
          debugger
          const {id} = await removePerson(person);
          console.log(`Removido ${person.id} ${id}`)
          const index =  this.people.findIndex((person) => {  
            return person.id === id
          })

          this.people.splice(index, 1)

        }
      }
  })
</script>

<style scoped>

</style>