<template>
  <CustomCard title="Encrypt / Decrypt">
    <CustomBtn @click="onclickGetEncryptionKeyButton">
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
    <CustomTextbox title="Cleartext">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { encrypt } from 'eth-sig-util';
import { ethers } from 'ethers';

const ethereum = window.ethereum;

export default defineComponent({
  name: 'ModuleEncryptDecrypt',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data: () => {
    return {
      encryptMessageInput: '',
      encryptionKeyDisplay: '',
      ciphertextDisplay: '',
      cleartextDisplay: '',
      account: '',
      encryptMessageInputDisabled: true,
      getEncryptionKeyButtonDisabled: false,
      encryptButtonDisabled: true,
      decryptButtonDisabled: true
    };
  },
  methods: {
    async onclickGetEncryptionKeyButton() {
      try {
        this.encryptionKeyDisplay = await ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [this.account]
        });
        this.encryptMessageInputDisabled = false;
      } catch (error) {
        this.encryptionKeyDisplay = `Error: ${error.message}`;
        this.encryptMessageInputDisabled = true;
        this.encryptButtonDisabled = true;
        this.decryptButtonDisabled = true;
      }
    },
    onEncryptMessageInput() {
      if (
        !this.getEncryptionKeyButtonDisabled &&
        this.encryptMessageInput.length > 0
      ) {
        if (this.encryptButtonDisabled) {
          this.encryptButtonDisabled = false;
        }
      } else if (!this.encryptButtonDisabled) {
        this.encryptButtonDisabled = true;
      }
    },
    async onclickDecryptButton() {
      try {
        this.cleartextDisplay = await ethereum.request({
          method: 'eth_decrypt',
          params: [this.ciphertextDisplay, ethereum.selectedAddress]
        });
      } catch (error) {
        this.cleartextDisplay = `Error: ${error.message}`;
      }
    },
    onclickEncryptButton() {
      try {
        this.ciphertextDisplay = this.stringifiableToHex(
          encrypt(
            this.encryptionKeyDisplay,
            { data: this.encryptMessageInput },
            'x25519-xsalsa20-poly1305'
          )
        );
        this.decryptButtonDisabled = false;
      } catch (error) {
        this.ciphertextDisplay = `Error: ${error.message}`;
        this.decryptButtonDisabled = true;
      }
    },
    stringifiableToHex(value) {
      return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
    },
    async getAccount() {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        this.account = accounts[0];
      } catch (e) {
        console.log(e);
      }
    }
  },

  created() {
    this.getAccount();
  }
});
</script>
