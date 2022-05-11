<template>
  <CustomCard title="Sign Typed Data">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="signV1()">Sign</CustomBtn>
    <CustomTextbox v-if="isSigned" title="Result">{{
      messageData
    }}</CustomTextbox>
    <CustomTextbox v-else title="Result">null</CustomTextbox>
    <v-divider class="my-12"></v-divider>
    <CustomBtn v-if="isSigned" @click="verify()">Verify</CustomBtn>
    <CustomBtn v-else disabled>Verify</CustomBtn>
    <CustomTextbox v-if="!isVerified || !isSigned" title="Recovery result"
      >null
    </CustomTextbox>
    <CustomTextbox v-else title="Recovery result">{{
      verifiedResults
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { toChecksumAddress } from 'ethereumjs-util';
import { recoverTypedSignatureLegacy } from 'eth-sig-util';

let messageData = ref('');
let verifiedResults = ref('');
let isSigned = ref(false);
let isVerified = ref(false);

const props = defineProps({
  ethereum: {
    type: Object,
    default: null
  },
  handleEIP1559Support: {
    default: function () {
      return {};
    },
    type: Function
  },
  fromAccount: {
    type: String,
    default: () => ''
  },
  isConnected: {
    type: Boolean,
    default: false
  }
});

const signV1 = async () => {
  console.log('sign:', props.fromAccount);
  const msgParams = [
    {
      type: 'string',
      name: 'Message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint32',
      name: 'A number',
      value: '1337'
    }
  ];
  try {
    const from = props.fromAccount;
    const signedData = await props.ethereum.request({
      method: 'eth_signTypedData',
      params: [msgParams, from]
    });
    messageData.value = signedData;
    isSigned.value = true;
    console.log('V1 signedData:', messageData.value);
  } catch (err) {
    console.error(err);
  }
};
const verify = async () => {
  console.log('verify in V1 has been triggered!');
  const msgParams = [
    {
      type: 'string',
      name: 'Message',
      value: 'Hi, Alice!'
    },
    {
      type: 'uint32',
      name: 'A number',
      value: '1337'
    }
  ];
  try {
    const from = props.fromAccount;
    const signature = messageData.value;
    const recoveredAddr = await recoverTypedSignatureLegacy({
      data: msgParams,
      sig: signature
      // version: SignTypedDataVersion.V1
    });
    if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
      console.log(`Successfully verified signer as ${recoveredAddr}`);
      verifiedResults.value = recoveredAddr;
      isVerified.value = true;
    } else {
      console.error(
        `Failed to verify signer when comparing ${recoveredAddr} to ${from}`
      );
    }
  } catch (err) {
    console.error(err);
  }
};
</script>
