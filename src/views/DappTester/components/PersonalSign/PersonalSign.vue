<template>
  <CustomCard title="Personal Sign">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="onclickPersonalSign">Sign</CustomBtn>

    <CustomTextbox title="Result">{{ personalSignResult }} </CustomTextbox>

    <v-divider class="my-12"></v-divider>

    <CustomBtn
      :disabled="disablePersonalSignVerify"
      @click="onclickPersonalSignVerify"
    >
      Verify
    </CustomBtn>

    <CustomTextbox title="eth-sig-util recovery result">
      {{ personalSignVerifySigUtilResult }}
    </CustomTextbox>

    <CustomTextbox title="personal_ecRecover result">
      {{ personalSignVerifyECRecoverResult }}
    </CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { Buffer } from 'buffer';

const ethereum = window.ethereum;
const personalSignResult = ref<string>('');
const disablePersonalSignVerify = ref<boolean>(true);
const personalSignVerifySigUtilResult = ref<string>('');
const personalSignVerifyECRecoverResult = ref<string>('');

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

/**
 * Personal Sign
 */
const onclickPersonalSign = async () => {
  const exampleMessage = 'Example `personal_sign` message';
  try {
    const from = props.fromAccount;
    const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
    const sign = await ethereum.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password']
    });
    personalSignResult.value = sign;
    disablePersonalSignVerify.value = false;
  } catch (err) {
    console.error(err);
    personalSignResult.value = `Error: ${err}`;
  }
};

/**
 * Personal Sign Verify
 */
const onclickPersonalSignVerify = async () => {
  const exampleMessage = 'Example `personal_sign` message';
  try {
    const from = props.fromAccount;
    const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
    const sign = personalSignResult.value;
    const recoveredAddr = recoverPersonalSignature({
      data: msg,
      signature: sign
    });
    if (recoveredAddr === from) {
      console.log(`SigUtil Successfully verified signer as ${recoveredAddr}`);
      personalSignVerifySigUtilResult.value = recoveredAddr;
    } else {
      console.log(
        `SigUtil Failed to verify signer when comparing ${recoveredAddr} to ${from}`
      );
      console.log(`Failed comparing ${recoveredAddr} to ${from}`);
    }
    const ecRecoverAddr = await ethereum.request({
      method: 'personal_ecRecover',
      params: [msg, sign]
    });
    if (ecRecoverAddr === from) {
      console.log(`Successfully ecRecovered signer as ${ecRecoverAddr}`);
      personalSignVerifyECRecoverResult.value = ecRecoverAddr;
    } else {
      console.log(
        `Failed to verify signer when comparing ${ecRecoverAddr} to ${from}`
      );
    }
  } catch (err) {
    console.error(err);
    personalSignVerifySigUtilResult.value = `Error: ${err}`;
    personalSignVerifyECRecoverResult.value = `Error: ${err}`;
  }
};
</script>
