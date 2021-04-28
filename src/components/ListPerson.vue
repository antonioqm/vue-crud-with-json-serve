<template>
  <div>
  <v-sheet
    :color="`transparent`"
    class="pa-10"
  >
  <Form />
  </v-sheet>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Form from '@/components/Form.vue';
  export default Vue.extend({
    components: {
      Form
    }
  })
</script>

<style lang="scss" scoped>
.v-skeleton-loader__text .v-skeleton-loader__bone {
  $skeleton-loader-divider-height: 60px;
  height: 60px !important;
}
</style>