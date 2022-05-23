<template>
  <CustomCard title="Eth Sign">
    <CustomBtn v-if="!isConnected" @click="onClickSign">Sign</CustomBtn>
    <CustomBtn v-else @click="onClickSign">Sign</CustomBtn>
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

const props = defineProps({
  fromAccount: {
    type: String,
    default: ''
  },
  isConnected: {
    type: Boolean,
    default: false
  }
});

const onClickSign = async () => {
  try {
    const ethResult = await ethereum.request({
      method: 'eth_sign',
      params: [props.fromAccount, message.value]
    });
    ethSignResult.value = ethResult;
  } catch (error) {
    const err = error as Error;
    console.error(err);
    ethSignResult.value = `Error: ${err.message}`;
  }
};
</script>
