<template>
  <v-card rounded="lg" elevation="0">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:60|min:5"
        >
          <v-text-field
            prepend-inner-icon="person"
            class="rounded-lg"
            v-model="name"
            clearable
            :counter="10"
            :error-messages="errors"
            label="Nome"
            placeholder="nome"
            outlined
          ></v-text-field>
        </validation-provider>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="invalid"
            depressed
            color="primary"
            large
            dark
            @click="save"
          >
            clear
          </v-btn>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import Vue from 'vue'
import {
  required,
  digits,
  email,
  max,
  regex,
  min,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
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

extend('min', {
  ...min,
  message: 'The {_field_} cannot be less than {length} characters',
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

  name: 'Form',
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    msg: '',
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    name: '',
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  computed: {
    formatDateLabel() {
      console.log(
        'computed',
        new Date(this.date).toLocaleDateString('pt-BR', {}),
      )
      return this.date
        ? new Date(this.date).toLocaleDateString('pt-BR', {})
        : ''
    },
  },
  methods: {
    formatDateTitle(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      let newDate = new Date(date).toLocaleDateString('pt-BR', options)
      return newDate
    },
    save(date) {
      this.$refs.menu.save(date)
    },
    submit() {
      this.$refs.observer.validate()
    },
    clear() {
      this.name = ''
      this.$refs.observer.reset()
    },
  },
})
</script>
<style lang="scss">
.v-card {
}
</style>
