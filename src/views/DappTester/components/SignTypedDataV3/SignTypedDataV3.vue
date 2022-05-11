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
import { recoverTypedSignature } from 'eth-sig-util';

const messageData = ref<string>('');
const verifiedResults = ref<string>('');
const isSigned = ref<boolean>(false);
const isVerified = ref<boolean>(false);

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
  },
  networkId: {
    type: String,
    default: () => ''
  },
  chainId: {
    type: String,
    default: () => ''
  }
});

const signV3 = async () => {
  const networkId = props.networkId;
  const chainId = props.chainId || networkId;
  console.log('networkId inside of V3:', networkId);
  const msgParams = {
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
      chainId,
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
  };
  try {
    const from = props.fromAccount;
    const signedData = await props.ethereum.request({
      method: 'eth_signTypedData_v3',
      params: [from, JSON.stringify(msgParams)]
    });
    messageData.value = signedData;
    isSigned.value = true;
    console.log('V3 signedData:', signedData);
  } catch (err) {
    console.error(err);
  }
};

const verify = async () => {
  const networkId = props.networkId;
  const chainId = props.chainId || networkId;
  const msgParams = {
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
      chainId,
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
  };
  try {
    const from = props.fromAccount;
    const signature = messageData.value;
    const recoveredAddr = await recoverTypedSignature({
      data: msgParams,
      sig: signature
    });
    if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
      console.log(`Successfully verified signer as ${recoveredAddr}`);
      verifiedResults.value = recoveredAddr;
      isVerified.value = true;
    } else {
      console.log(
        `Failed to verify signer when comparing ${recoveredAddr} to ${from}`
      );
    }
  } catch (err) {
    console.error(err);
  }
};
</script>
