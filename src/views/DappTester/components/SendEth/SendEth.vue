<template>
  <CustomCard title="Send Eth">
    <v-text-field
      hide-details
      v-model="address"
      variant="outlined"
      label="Account (Ethereum address)"
    ></v-text-field>

    <v-divider class="my-5" />

    <CustomBtn @click="sendTx">Send Legacy Transaction</CustomBtn>
    <CustomTextbox title="TX Hash">
      {{ txHash }}
    </CustomTextbox>

    <v-divider class="my-5" />

    <CustomBtn @click="sendTxEIP1559">Send EIP 1559 Transaction</CustomBtn>
    <CustomTextbox title="TX EIP1559 Hash">
      {{ txHashEIP1559 }}
    </CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const ethereum = window.ethereum;
const txHash = ref<string>('');
const txHashEIP1559 = ref<string>('');

const props = defineProps({
  fromAccount: {
    type: String,
    default: ''
  }
});

const sendTx = async () => {
  const result = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: props.fromAccount,
        to: '0x1cC1D4F49E27Ac6b0b7D55A14B8F07179D8aFaf4',
        value: '0x0',
        gasLimit: '0x5208',
        gasPrice: '0x2540be400',
        type: '0x0'
      }
    ]
  });
  txHash.value = result;
};

const sendTxEIP1559 = async () => {
  const result = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: props.fromAccount,
        to: '0x1cC1D4F49E27Ac6b0b7D55A14B8F07179D8aFaf4',
        value: '0x0',
        gasLimit: '0x5208',
        maxFeePerGas: '0x2540be400',
        maxPriorityFeePerGas: '0x3b9aca00'
      }
    ]
  });
  txHashEIP1559.value = result;
};

const address = computed(() => {
  return props.fromAccount;
});
</script>
