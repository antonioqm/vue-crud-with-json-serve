<template>
  <div>
  <v-card
    class=""
    width="344"
  >

    <v-card-title>
      {{person.name}}
    </v-card-title>

    <v-card-subtitle>
      {{person.birthDate}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="grey darken-1"
        text
        @click="edit"
      >
        Editar
      </v-btn>
      <v-btn
        color="error lighten-1"
        text
        @click="remove"
      >
        Remover
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'expand_less' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{person.bio}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({

    props: {
      person: null
    },
    data: () => ({
      show: false
    }),
    methods: {
      async edit(){
        await this.$root.$emit('edit-person', this.person);
      },
      async remove(){
        await this.$root.$emit('remove-person', this.person);
      }
    }
    
  })
</script>

<style scoped>

</style>