<template>
  <div class="mt-4">
    <h5 class="text-secondary">{{ title }}</h5>
    <div class="custom-textbox">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: '' }
});
</script>

<style lang="scss" scoped>
.custom-textbox {
  background-color: rgb(var(--v-theme-blue-lighten-1));
  border-radius: 4px;
  padding: 10px;
  min-height: 85px;
  overflow-wrap: break-word;
  font-family: 'DejaVu Sans Mono', monospace;
  font-size: 0.8rem;
}
</style>
