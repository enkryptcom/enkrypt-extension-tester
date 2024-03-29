<template>
  <CustomCard title="Sign Typed Data V3">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="signV3()">Sign</CustomBtn>
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
import {
  recoverTypedSignature,
  SignTypedDataVersion
} from '@metamask/eth-sig-util';

const messageData = ref<string>('');
const verifiedResults = ref<string>('');
const isSigned = ref<boolean>(false);
const isVerified = ref<boolean>(false);
const ethereum = window.ethereum;

const props = defineProps({
  handleEIP1559Support: {
    default: () => {
      return {};
    },
    type: Function
  },
  fromAccount: {
    type: String,
    default: ''
  },
  isConnected: {
    type: Boolean,
    default: false
  },
  chainId: {
    type: String,
    default: ''
  }
});

const msgParams = () => ({
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' }
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: parseInt(BigInt(props.chainId).toString()),
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
    },
    contents: 'Hello, Bob!'
  }
});

const signV3 = async () => {
  try {
    const from = props.fromAccount;
    const signedData = await ethereum.request({
      method: 'eth_signTypedData_v3',
      params: [from, JSON.stringify(msgParams())]
    });
    messageData.value = signedData;
    isSigned.value = true;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const verify = async () => {
  const from = props.fromAccount;
  const signature = messageData.value;
  const recoveredAddr = await recoverTypedSignature({
    data: msgParams() as never,
    signature,
    version: SignTypedDataVersion.V3
  });
  if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
    verifiedResults.value = recoveredAddr;
    isVerified.value = true;
  }
};
</script>
