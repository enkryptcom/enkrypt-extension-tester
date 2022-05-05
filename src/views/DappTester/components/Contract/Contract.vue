<template>
  <CustomCard title="Contract">
    <CustomBtn>Deploy Contract</CustomBtn>
    <CustomBtn>Deposit</CustomBtn>
    <CustomBtn>Withdraw</CustomBtn>
    <CustomTextbox title="Contract Status">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleContract',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
