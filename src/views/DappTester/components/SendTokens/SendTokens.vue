<template>
  <CustomCard title="Send Tokens">
    <div class="font-weight-bold">Token: null</div>
    <CustomBtn>Create Token</CustomBtn>
    <CustomBtn>Add Token to Wallet</CustomBtn>
    <CustomBtn>Transfer Tokens</CustomBtn>
    <CustomBtn>Approve Tokens</CustomBtn>
    <CustomBtn>Transfer Tokens Without Gas</CustomBtn>
    <CustomBtn>Approve Tokens Without Gas</CustomBtn>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'SendTokens',
  components: { CustomCard, CustomBtn },
  props:{
    ethereum:{
      type: Object,
      default: null
    }
  }
});
</script>
