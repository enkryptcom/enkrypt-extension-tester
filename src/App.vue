<template>
  <v-app>
    <NavMenu />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import TheFooter from '@/components/TheFooter/TheFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavMenu,
    TheFooter
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss">
@import '@/styles/base.scss';
</style>
