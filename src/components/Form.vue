<template>
  <!-- <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        /> -->
  <v-card rounded="lg" elevation="0">
    <v-text-field prepend-inner-icon="person" class="rounded-lg" clearable label="Nome" placeholder="nome" outlined  ></v-text-field>
    <v-text-field prepend-inner-icon="badge" class="rounded-lg" clearable label="CPF" placeholder="CPF" outlined  ></v-text-field>

  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
      class="rounded-lg"
        label="Data de nascimento"
        prepend-inner-icon="event_available"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
        clearable
        @click:clear="date = null"
        :value="formatDateLabel"
      ></v-text-field>
    </template>
    <v-date-picker
    :title-date-format="formatDateTitle"
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>

      <!-- <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-inner-icon="event_available"
            v-bind="attrs"
            v-on="on"
            readonly
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog> -->
      
    <v-card-actions>
      <v-spacer></v-spacer>
    <v-btn  depressed color="primary" large dark @click="save"> clear </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // props: {
  //   msg: String
  // },
  name: "Form",

  data: () => ({
    msg: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    computed: {
      formatDateLabel(){     
        console.log("computed", new Date(this.date).toLocaleDateString("pt-BR", {}))                        
        return this.date ?  new Date(this.date).toLocaleDateString("pt-BR", {}) : ''
      }
    },
    methods: {
      formatDateTitle(date){
        const options:any = {year: 'numeric', month: 'short', day: 'numeric' };
        let newDate = new Date(date).toLocaleDateString("pt-BR", options);
        return newDate;
        
      },
      save (date:any) {
        this.$refs.menu.save(date)
      },
    },
  
});
</script>
<style lang="scss">
  .v-card{
    // padding: 2em;
  }
</style>