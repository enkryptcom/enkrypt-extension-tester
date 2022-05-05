<template>
  <CustomCard title="Ethereum Chain Interactions">
    <CustomBtn>Add xDAI Chain</CustomBtn>
    <CustomBtn>Switch to xDAI Chain</CustomBtn>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleEthereumChainInteractions',
  components: { CustomCard, CustomBtn }
});
</script>
