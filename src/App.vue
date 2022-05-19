<template>
  <v-app>
    <NavMenu />
    <v-main>
      <router-view v-if="web3Available" />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import TheFooter from '@/components/TheFooter/TheFooter.vue';
import { onMounted, ref } from 'vue';
const web3Available = ref<boolean>(false);
onMounted(() => {
  const timer = setInterval(() => {
    if (window.ethereum) {
      web3Available.value = true;
      clearInterval(timer);
    }
  }, 500);
});
</script>

<style lang="scss">
@import '@/styles/base.scss';
</style>
