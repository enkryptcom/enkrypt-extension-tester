<template>
  <CustomCard title="Sign Typed Data">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="signV1">Sign</CustomBtn>
    <CustomTextbox v-if="isSigned" title="Result">{{
      messageData
    }}</CustomTextbox>
    <CustomTextbox v-else title="Result">null</CustomTextbox>
    <v-divider class="my-12"></v-divider>
    <CustomBtn v-if="isSigned" @click="verify">Verify</CustomBtn>
    <CustomBtn v-else disabled>Verify</CustomBtn>
    <CustomTextbox v-if="!isVerified || !isSigned" title="Recovery result"
      >null
    </CustomTextbox>
    <CustomTextbox v-else title="Recovery result">{{
      verifiedResults
    }}</CustomTextbox>
  </CustomCard>
</template>

<script>
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { toChecksumAddress } from 'ethereumjs-util';
import { recoverTypedSignatureLegacy } from 'eth-sig-util';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'ModuleSignTypedData',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props: {
    fromAccount: {
      type: String,
      default: () => ''
    },
    isConnected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      messageData: '',
      verifiedResults: '',
      isSigned: false,
      isDisabled: false,
      isVerified: false
    };
  },
  mounted() {
    this.ethereum = window.ethereum;
    this.ethereumProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
  },
  methods: {
    async signV1() {
      console.log('sign:', this.fromAccount);
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
        const from = this.fromAccount;
        const signedData = await this.ethereum.request({
          method: 'eth_signTypedData',
          params: [msgParams, from]
        });
        this.messageData = signedData;
        this.isSigned = true;
        console.log('V1 signedData:', signedData);
      } catch (err) {
        console.error(err);
      }
    },
    async verify() {
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
        const from = this.fromAccount;
        const signature = this.messageData;
        const recoveredAddr = await recoverTypedSignatureLegacy({
          data: msgParams,
          sig: signature
          // version: SignTypedDataVersion.V1
        });
        if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
          console.log(`Successfully verified signer as ${recoveredAddr}`);
          this.verifiedResults = recoveredAddr;
          this.isVerified = true;
        } else {
          console.error(
            `Failed to verify signer when comparing ${recoveredAddr} to ${from}`
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
  watch: {}
});
</script>
