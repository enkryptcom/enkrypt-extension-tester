<template>
  <div class="custom-card">
    <div class="mb-6">
      <h4 v-if="title" class="text-uppercase">
        {{ title }}
      </h4>
      <h5 v-if="subtitle" class="text-secondary">
        {{ subtitle }}
      </h5>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.custom-card {
  background-color: white;
  box-shadow: 0px 0px 14px #00000014;
  padding: 20px;
  border-radius: 10px;
}
</style>
