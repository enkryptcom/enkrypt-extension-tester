<template>
  <CustomCard title="Eth Sign">
    <CustomBtn>Sign</CustomBtn>
    <CustomTextbox title="Result">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleEthSign',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
