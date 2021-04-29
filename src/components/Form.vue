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
            type="text"
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
          rules="cpf|required|max:14|min:5"
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
            v-mask="{ mask: '###.###.###-##' }"
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
            <validation-provider
              v-slot="{ errors }"
              name="niver"
              rules="required|afterCurrentDate"
            >
              <v-text-field
                class="rounded-lg"
                label="Data de nascimento"
                prepend-inner-icon="event_available"
                readonly
                :error-messages="errors"
                v-bind="attrs"
                v-on="on"
                outlined
                clearable
                @focus="menu=true"
                @click:clear="form.birthDate = null"
                v-model="form.birthDate"
              ></v-text-field>
            </validation-provider>
          </template>
          <v-date-picker
            :title-date-format="formatDateTitle"
            ref="picker"
            v-model="form.birthDate"
            min="1950-01-01"
            max="2025-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed large dark @click="clear">
            Limpar
          </v-btn>
          <v-btn
            :disabled="false"
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
import { mask } from '@titou10/v-mask'
import validate from '@/service/validate'
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

extend('cpf', async (cpf) => {
  let valid = await validate.cpf(cpf)

  return valid ? true : 'CPF inválido'
})
extend('afterCurrentDate', async (date) => {
  let valid = await validate.afterCurrentDate(date)

  return valid ? true : `A data não pode ser posterior a data de hoje, ${currentDate}`
})
const options = { year: 'numeric', month: 'long', day: 'numeric' }
let currentDate = new Date().toLocaleDateString('pt-BR', options)
export default Vue.extend({
  name: 'Form',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  directives: { mask },

  data: () => ({
    msg: '',
    menu: false,
    form: {
      name: '',
      cpf: null,
      birthDate: new Date().toISOString().substr(0, 10),
    },
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
        new Date(this.form.birthDate).toLocaleDateString('pt-BR', {}),
      )
      return this.form.birthDate
        ? new Date(this.form.birthDate).toLocaleDateString('pt-BR', {})
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
      let valid = await this.$refs.observer.validate()
      if (valid) {
        console.log(this.form)
      }
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
