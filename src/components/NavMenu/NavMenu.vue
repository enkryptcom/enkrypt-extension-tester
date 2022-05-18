<template>
  <v-app-bar color="#0c1427" flat>
    <v-container>
      <div class="d-flex align-center">
        <img :src="logo" alt="Myetherwallet.com" height="30" class="mr-10" />

        <div v-if="false" class="d-flex align-end" style="width: 400px">
          <v-icon class="mr-1">mdi-magnify</v-icon>
          <v-text-field
            hide-details
            density="compact"
            bg-color="blue"
            variant="underlined"
            label="Search here..."
          ></v-text-field>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script setup lang="ts">
const logo = require('@/assets/images/logo-mew.svg');
</script>
