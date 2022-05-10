<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: null</div>
    <div class="font-weight-bold">ChainId: null</div>
    <div class="font-weight-bold">Accounts: null</div>

    <CustomBtn @click="connectAccount">Connect</CustomBtn>
    <CustomBtn @click="getAccount">eth_accounts</CustomBtn>
    <CustomTextbox title="eth_accounts result">{{
      this.accounts
    }}</CustomTextbox>
  </CustomCard>
</template>

<script>
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'BasicActions',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data() {
    return {
      accounts: null,
      accountsResult: null,
      ethereumProvider: {},
      ethereum: {}
    };
  },
  computed: {
    isMetaMaskConnected() {
      return this.accounts && this.accounts.length > 0;
    }
  },
  mounted() {
    this.ethereumProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
    this.ethereum = window.ethereum;
  },
  methods: {
    async connectAccount() {
      try {
        const newAccounts = await this.ethereum.request({
          method: 'eth_requestAccounts'
        });
        this.handleNewAccounts(newAccounts);
      } catch (err) {
        console.error(err);
      }
    },
    async getAccount() {
      try {
        const _accounts = await this.ethereum.request({
          method: 'eth_accounts'
        });
        this.accountsResult = _accounts[0] || 'Not able to get accounts';
      } catch (err) {
        console.error(err);
        this.accountsResult = `Error: ${err.message}`;
      }
    },
    handleNewAccounts(newAccounts) {
      this.accounts = newAccounts.toString();
      this.$emit('setFromAccount', this.accounts);
      if (this.isMetaMaskConnected) {
        this.$emit('setIsConnected', true);
        console.log('this.accounts connected!', this.accounts);
      }
    }
  }
});
</script>
