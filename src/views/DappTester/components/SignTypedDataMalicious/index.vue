<template>
  <CustomCard title="Sign Typed Data Malicious">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="signV4()">Sign</CustomBtn>
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
  primaryType: 'RelayRequest',
  domain: {
    name: 'EIP-712 Test - Relayed Transaction',
    verifyingContract: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
    version: '1',
    chainId: 1
  },
  types: {
    EIP712Domain: [
      {
        name: 'name',
        type: 'string'
      },
      {
        type: 'string',
        name: 'version'
      },
      {
        type: 'address',
        name: 'verifyingContract'
      },
      {
        name: 'chainId',
        type: 'uint256'
      }
    ],
    RelayRequest: [
      {
        type: 'address',
        name: 'target'
      },
      {
        type: 'string',
        name: 'message'
      },
      {
        type: 'NestedRelayRequest',
        name: 'nested'
      }
    ],
    NestedRelayRequest: [
      {
        type: 'address',
        name: 'target'
      },
      {
        type: 'string',
        name: 'message'
      }
    ]
  },
  message: {
    target: '0x0101010101010101010101010101010101010101',
    message: 'Howdy',
    nested: {
      target: '0x0101010101010101010101010101010101010101',
      message: 'Nested Howdy',
      '': {
        target: 'THIS IS THE FAKE TARGET',
        message: 'THIS IS A FAKE MESSAGE'
      }
    },
    '': {
      target: 'THIS IS THE FAKE TARGET',
      message: 'THIS IS A FAKE MESSAGE'
    }
  }
});

const signV4 = async () => {
  try {
    const from = props.fromAccount;
    const signedData = await ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [from, JSON.stringify(msgParams())]
    });
    messageData.value = signedData;
    isSigned.value = true;
  } catch (err) {
    return err;
  }
};
const verify = async () => {
  const from = props.fromAccount;
  const signature = messageData.value;
  const recoveredAddr = recoverTypedSignature({
    data: msgParams() as never,
    signature,
    version: SignTypedDataVersion.V4
  });
  if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
    verifiedResults.value = recoveredAddr;
    isVerified.value = true;
  }
};
</script>
