<template>
  <CustomCard title="PolkadotDapp Connect">
    <CustomBtn @click="connect()">Connect</CustomBtn>
    <CustomTextbox title="Result">{{}}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';
const connect = async () => {
  const allInjected = await web3Enable('my cool dapp');
  console.log(allInjected);
  web3AccountsSubscribe(console.log);
};
</script>
