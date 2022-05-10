<template>
  <CustomCard title="Sign Typed Data V4">
    <CustomBtn v-if="!isConnected" disabled>Sign</CustomBtn>
    <CustomBtn v-else @click="signV4">Sign</CustomBtn>
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
import { recoverTypedSignature_v4 as recoverTypedSignatureV4 } from 'eth-sig-util';

export default defineComponent({
  name: 'ModuleSignTypedDataV4',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props: {
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
  },
  data() {
    return {
      provider: null,
      messageData: '',
      verifiedResults: '',
      isSigned: false,
      isDisabled: false,
      isVerified: false
    };
  },
  methods: {
    async signV4() {
      const networkId = this.networkId;
      const chainId = networkId;
      const msgParams = {
        domain: {
          chainId: chainId.toString(),
          name: 'Ether Mail',
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
          version: '1',
        },
        message: {
          contents: 'Hello, Bob!',
          from: {
            name: 'Cow',
            wallets: [
              '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
            ]
          },
          to: [
            {
              name: 'Bob',
              wallets: [
                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                '0xB0B0b0b0b0b0B000000000000000000000000000'
              ]
            }
          ]
        },
        primaryType: 'Mail',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ],
          Group: [
            { name: 'name', type: 'string' },
            { name: 'members', type: 'Person[]' }
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person[]' },
            { name: 'contents', type: 'string' }
          ],
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' }
          ]
        }
      };
      try {
        const from = this.fromAccount;
        const signedData = await this.ethereum.request({
          method: 'eth_signTypedData_v4',
          params: [from, JSON.stringify(msgParams)]
        });
        this.messageData = signedData;
        this.isSigned = true;
        console.log('V4 signedData:', signedData);
      } catch (err) {
        console.error(err);
      }
    },
    async verify() {
      const networkId = this.networkId;
      const chainId = networkId;
      const msgParams = {
        domain: {
          chainId,
          name: 'Ether Mail',
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
          version: '1'
        },
        message: {
          contents: 'Hello, Bob!',
          from: {
            name: 'Cow',
            wallets: [
              '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
              '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'
            ]
          },
          to: [
            {
              name: 'Bob',
              wallets: [
                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                '0xB0B0b0b0b0b0B000000000000000000000000000'
              ]
            }
          ]
        },
        primaryType: 'Mail',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ],
          Group: [
            { name: 'name', type: 'string' },
            { name: 'members', type: 'Person[]' }
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person[]' },
            { name: 'contents', type: 'string' }
          ],
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' }
          ]
        }
      };
      try {
        const from = this.fromAccount;
        const signature = this.messageData;
        const recoveredAddr = recoverTypedSignatureV4({
          data: msgParams,
          sig: signature
        });
        if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
          console.log(`Successfully verified signer as ${recoveredAddr}`);
          this.verifiedResults = recoveredAddr;
          this.isVerified = true;
        } else {
          console.log(
            `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
});
</script>
