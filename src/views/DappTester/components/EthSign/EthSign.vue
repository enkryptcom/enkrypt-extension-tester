<template>
  <CustomCard title="Eth Sign">
    <v-text-field
      hide-details
      v-model="message"
      variant="outlined"
      label="Message"
    ></v-text-field>
    <CustomBtn @click="onClickSign">Sign</CustomBtn>
    <CustomTextbox title="Result">{{ ethSignResult }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const ethereum = window.ethereum;

const message = ref<string>(
  '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0'
);
const ethSignResult = ref<string>('');
let account: unknown = '';

const onClickSign = async () => {
  try {
    const ethResult = await ethereum.request({
      method: 'eth_sign',
      params: [account, message.value]
    });
    ethSignResult.value = JSON.stringify(ethResult);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    ethSignResult.value = `Error: ${err.message}`;
  }
};

const getAccount = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    account = accounts[0];
  } catch (error) {
    const err = error as Error;
    console.log(err);
  }
};

getAccount();
</script>
