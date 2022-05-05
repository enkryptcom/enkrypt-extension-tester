<template>
  <CustomCard title="Send Eth">
    <CustomBtn>Send Legacy Transaction</CustomBtn>
    <CustomBtn>Send EIP 1559 Transaction</CustomBtn>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'moduleSendEth',
  components: { CustomCard, CustomBtn }
});
</script>
