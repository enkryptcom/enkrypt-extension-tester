<template>
  <CustomCard title="Encrypt / Decrypt">
    <CustomBtn v-if="!isConnected" disabled>Get Encryption Key</CustomBtn>
    <CustomBtn v-else @click="onclickGetEncryptionKeyButton">
      Get Encryption Key
    </CustomBtn>

    <v-divider class="my-12"></v-divider>

    <v-text-field
      :disabled="encryptMessageInputDisabled"
      hide-details
      v-model="encryptMessageInput"
      variant="outlined"
      label="Message to encrypt"
      @keyup="onEncryptMessageInput"
    ></v-text-field>

    <CustomBtn @click="onclickEncryptButton" :disabled="encryptButtonDisabled">
      Encrypt
    </CustomBtn>

    <v-divider class="my-12"></v-divider>

    <CustomBtn @click="onclickDecryptButton" :disabled="decryptButtonDisabled">
      Decrypt
    </CustomBtn>

    <CustomTextbox title="Encryption key">
      {{ encryptionKeyDisplay }}
    </CustomTextbox>

    <CustomTextbox title="Ciphertext">{{ ciphertextDisplay }}</CustomTextbox>
    <CustomTextbox title="Cleartext">{{ cleartextDisplay }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { encrypt } from '@metamask/eth-sig-util';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';

const ethereum = window.ethereum;
const encryptMessageInput = ref('');
const encryptionKeyDisplay = ref('');
const ciphertextDisplay = ref('');
const cleartextDisplay = ref('');
const encryptMessageInputDisabled = ref(true);
const getEncryptionKeyButtonDisabled = ref(false);
const encryptButtonDisabled = ref(true);
const decryptButtonDisabled = ref(true);

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

const onclickGetEncryptionKeyButton = async () => {
  try {
    encryptionKeyDisplay.value = await ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [props.fromAccount]
    });
    encryptMessageInputDisabled.value = false;
  } catch (error) {
    const err = error as Error;
    encryptionKeyDisplay.value = `Error: ${err.message}`;
    encryptMessageInputDisabled.value = true;
    encryptButtonDisabled.value = true;
    decryptButtonDisabled.value = true;
  }
};

const onEncryptMessageInput = () => {
  if (
    !getEncryptionKeyButtonDisabled.value &&
    encryptMessageInput.value.length > 0
  ) {
    if (encryptButtonDisabled.value) {
      encryptButtonDisabled.value = false;
    }
  } else if (!encryptButtonDisabled.value) {
    encryptButtonDisabled.value = true;
  }
};

const onclickDecryptButton = async () => {
  try {
    cleartextDisplay.value = await ethereum.request({
      method: 'eth_decrypt',
      params: [ciphertextDisplay.value, ethereum.selectedAddress]
    });
  } catch (error) {
    const err = error as Error;
    cleartextDisplay.value = `Error: ${err.message}`;
  }
};

const onclickEncryptButton = () => {
  try {
    ciphertextDisplay.value = stringifiableToHex(
      encrypt({
        data: encryptMessageInput.value,
        publicKey: encryptionKeyDisplay.value,
        version: 'x25519-xsalsa20-poly1305'
      })
    );
    decryptButtonDisabled.value = false;
  } catch (error) {
    const err = error as Error;
    ciphertextDisplay.value = `Error: ${err.message}`;
    decryptButtonDisabled.value = true;
  }
};

const stringifiableToHex = (value: any) => {
  return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
};
</script>
