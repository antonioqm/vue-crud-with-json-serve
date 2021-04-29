<template>
  <v-card rounded="lg" elevation="0">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="Nome"
          rules="required|max:60|min:5"
        >
          <v-text-field
            prepend-inner-icon="person"
            class="rounded-lg"
            v-model="form.name"
            clearable
            :counter="60"
            :error-messages="errors"
            label="Nome"
            placeholder="nome"
            outlined
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="CPF"
          rules="required|max:14|min:5"
        >
        <v-text-field
          prepend-inner-icon="badge"
          class="rounded-lg"
          clearable
          v-model="form.cpf"
          :counter="14"
           :error-messages="errors"
          label="CPF"
          placeholder="CPF"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          outlined
        ></v-text-field>
        </validation-provider>

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
            depressed
            color="primary"
            large
            dark
            @click="clear"
          >
            clear
          </v-btn>
          <v-btn
            :disabled="invalid"
            depressed
            color="primary"
            large
            dark
            @click="submit"
          >
            enviar
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
  message: '{_field_} precisar ter {length} digitos. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: 'O {_field_} precisa ter no máximo {length} caracteres',
})

extend('min', {
  ...min,
  message: 'O {_field_} precisar ter no mínimo {length} caracteres',
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
    form: {
      name: "",
      cpf: "",
      birthDate: ""
    }
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
    async submit() {
      let teste = await this.$refs.observer.validate()
      console.log(teste)
      
    },
    clear() {
      this.form.name = ''
      this.$refs.observer.reset()
    },
  },
})
</script>
<style lang="scss">
.v-card {
}
</style>
