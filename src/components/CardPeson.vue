<template>
  <div>
  <v-card
    class=""
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

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
      >
        Editar
      </v-btn>
      <v-btn
        color="error lighten-1"
        text
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
    })
    
  })
</script>

<style scoped>

</style>