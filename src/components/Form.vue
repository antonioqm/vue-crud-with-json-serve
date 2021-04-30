<template>
  <v-card rounded="lg" elevation="0">
    <validation-observer ref="observer" v-slot="{ dirty, invalid }">
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
              name="Data de Nascimento"
              rules="required|afterCurrentDate"
            >
              <v-text-field
                class="rounded-lg"
                label="Data de nascimento"
                prepend-inner-icon="event"
                readonly
                :error-messages="errors"
                v-bind="attrs"
                v-on="on"
                outlined
                clearable
                @focus="menu = true"
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
        <v-textarea
          outlined
          class="rounded-lg"
          label="Outlined textarea"
          v-model="form.bio"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!dirty" depressed large @click="clear">
            Limpar
          </v-btn>
          <v-btn
            depressed
            color="primary"
            large
            type="submit"
            :disabled="invalid"
          >
            enviar
          </v-btn>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import Vue from "vue"
import { mask } from "@titou10/v-mask"
import validate from "@/service/validate"
import { localize } from "vee-validate"
import pt_BR from "vee-validate/dist/locale/pt_BR.json"
import { createPerson, editPerson } from "@/http/api"

localize("pt_BR", pt_BR)
import { required, digits, email, max, min } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate"

setInteractionMode("eager")

extend("digits", {
  ...digits,
  message: "{_field_} precisar ter {length} digitos. ({_value_})",
})

extend("required", {
  ...required,
  message: "{_field_} não pode ser vazio",
})

extend("max", {
  ...max,
  message: "O {_field_} precisa ter no máximo {length} caracteres",
})

extend("min", {
  ...min,
  message: "O {_field_} precisar ter no mínimo {length} caracteres",
})

extend("email", {
  ...email,
  message: "Email must be valid",
})

extend("cpf", async (cpf) => {
  let valid = await validate.cpf(cpf)

  return valid ? true : "CPF inválido"
})
extend("afterCurrentDate", async (date) => {
  let valid = await validate.afterCurrentDate(date)

  return valid ? true : `Data não pode ser posterior a hoje (${currentDate})`
})

const options = { year: "numeric", month: "long", day: "numeric" }
let currentDate = new Date().toLocaleDateString("pt-BR", options)

export default Vue.extend({
  name: "Form",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  directives: { mask },

  data: () => ({
    msg: "",
    menu: false,
    form: {
      name: "",
      id: null,
      cpf: null,
      birthDate: null,
      bio: "",
    },
  }),
  async mounted() {
    ;(this.form = {
      id: null,
      cpf: "787.733.692-68",
      birthDate: "1986-05-01",
      name: "1JOão",
    }),
      await this.$root.$on("edit-person", this.edit)
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
    },
    form: {
      deep: true,
      handler: (val) => {
        //  this.form.birthDate = "2021-01-01"
        console.log("form changed!")
      },
    },
  },
  computed: {
    formDirty: () => {
      return false
    },
    formatDateLabel() {
      const options = { year: "numeric", month: "short", day: "numeric" }
      return this.form.birthDate
        ? new Date(this.form.birthDate).toLocaleDateString("pt-BR", options)
        : ""
    },
  },
  methods: {
    edit(person) {
      this.form = { ...person }
    },
    async generateId() {
      let limit = Math.pow(10, 7)
      let id = Math.floor(Math.random() * limit) + 1
      return id
    },
    formatDateTitle(date) {
      const options = { year: "numeric", month: "short", day: "numeric" }
      let newDate = new Date(date).toLocaleDateString("pt-BR", options)
      return newDate
    },

    save(date) {
      this.$refs.menu.save(date)
    },
    async submit(person) {
      console.log("clicou em", this.form.id)

      if (this.form.id !== null) {
        console.log("editando pq tenho id", this.form.id)
        const personEdited = await editPerson(this.form)
        console.log("personEdited", personEdited)
        await this.$root.$emit("edited-person", personEdited)
        return
      } else {
        console.log("criando", this.form.id)
        console.log("form", this.form.id)
        this.$refs.observer.reset()
        this.form.id = await this.generateId()
        const newPerson = await createPerson(this.form)
        this.form = {
          id: null,
          name: "",
          birthDate: null,
          cpf: null,
          bio: "",
        }
        await this.$root.$emit("new-person", newPerson)
      }
    },
    clear() {
      console.log(this.$refs.observer.flags.dirty)
      console.log(this.$refs.observer)
      this.$refs.observer.reset()
    },
  },
})
</script>
<style lang="scss">
.v-card {
}
</style>
