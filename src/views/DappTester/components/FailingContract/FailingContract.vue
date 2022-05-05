<template>
  <CustomCard title="Failing Contract">
    <CustomBtn>Deploy Failing Contract</CustomBtn>
    <CustomBtn>Send Failing Transaction</CustomBtn>
    <CustomTextbox title="Failing Contract Status">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleFailingContract',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
