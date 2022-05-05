<template>
  <CustomCard>
    <template #header> Basic Actions </template>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';

export default defineComponent({
  name: 'BasicActions',
  components: { CustomCard }
});
</script>
