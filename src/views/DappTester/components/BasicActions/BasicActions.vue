<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: null</div>
    <div class="font-weight-bold">ChainId: null</div>
    <div class="font-weight-bold">Accounts: null</div>

    <CustomBtn>Connect</CustomBtn>
    <CustomBtn>eth_accounts</CustomBtn>
    <CustomTextbox title="eth_accounts result">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'BasicActions',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
