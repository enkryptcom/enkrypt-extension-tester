<template>
  <v-btn color="btn" class="my-3" block flat>
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomBtn',
  data() {
    return {};
  },
  props: []
});
</script>

<style lang="scss" scoped>
.v-btn {
  font-size: 0.75rem;
}
</style>
