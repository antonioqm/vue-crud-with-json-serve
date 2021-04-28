<template>
<div>
<MyContainer />
</div>
  
</template>

<script lang="ts">
import Vue from "vue";
import MyContainer from "../components/MyContainer.vue";

export default Vue.extend({
  name: "Home",

  components: {
    MyContainer
  },
});
</script>
