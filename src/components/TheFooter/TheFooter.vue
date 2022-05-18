<template>
  <div class="the-footer">
    <v-container class="d-flex align-center justify-start">
      <img :src="logo" alt="Myetherwallet.com" height="17" class="mr-3" />
      <h6 class="text-white">©2022 MyEtherWallet Inc. All rights reserved</h6>
    </v-container>
  </div>
</template>
<script setup lang="ts">
const logo = require('@/assets/images/logo-mew.svg');
</script>

<style lang="scss" scoped>
.the-footer {
  padding: 5px 0;
  border-top: 1px solid #e7e7e7;
  background-color: #1a4b90;
}
</style>
