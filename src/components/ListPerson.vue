<template>
  <div >
  <v-card
    :color="`transparent`"
    class="my-container"
    depressed
    elevation="0"
  >
  <template v-for="(person, i) in people">
    <CardPeson class="pa-2" :key="i"  :person="person" />
    
  </template>
  </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CardPeson from '@/components/CardPeson.vue'
  export default Vue.extend({
    props: {
      people: {
        default: [],
        type: Array,
      }
    },
    components: {
      CardPeson
    }
    
  })
</script>

<style lang="scss" scoped>
.v-skeleton-loader__text .v-skeleton-loader__bone {
  $skeleton-loader-divider-height: 60px;
  height: 60px !important;
}
.my-container{
  display: flex;
  flex-direction: row;
  max-width: 100%;
  flex-wrap: wrap;
}
</style>