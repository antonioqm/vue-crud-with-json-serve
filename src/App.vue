<template>
  <v-app>
<v-app-bar
      app
      color="white"
      flat
      elevation="1"
    >
      <!-- <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'brown darken-1 shrink white--text' : 'transparent'"
        size="32"
      >AN</v-avatar> -->

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down darken-1 white--text"
        color="brown darken-1 shrink"
        size="32"
      >AN</v-avatar>
    </v-app-bar>

      
    <v-main class="grey lighten-4">
  <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
  name: "App",

  data: () => ({
    links: [
        'Listar',
        'Criar',
      ],
  }),
});
</script>
