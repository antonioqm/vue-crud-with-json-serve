<template>
  <v-card rounded="lg" elevation="0">
      <form @submit.prevent="submit">
        <v-text-field
          prepend-inner-icon="person"
          class="rounded-lg"
          clearable
          label="Nome"
          placeholder="nome"
          outlined
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="badge"
          class="rounded-lg"
          clearable
          label="CPF"
          placeholder="CPF"
          outlined
        ></v-text-field>

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
      </form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" large dark @click="save"> clear </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import Vue from "vue";
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })


export default Vue.extend({
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  name: "Form",


  data: () => ({
    msg: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  computed: {
    formatDateLabel() {
      console.log(
        "computed",
        new Date(this.date).toLocaleDateString("pt-BR", {})
      );
      return this.date
        ? new Date(this.date).toLocaleDateString("pt-BR", {})
        : "";
    },
  },
  methods: {
    formatDateTitle(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      let newDate = new Date(date).toLocaleDateString("pt-BR", options);
      return newDate;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
});
</script>
<style lang="scss">
.v-card {
}
</style>