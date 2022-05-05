<template>
  <CustomCard title="Basic Actions">
    <CustomBtn 
      :disabled="isDisabled"
      @click="onClickConnect"
    >
      Connect
    </CustomBtn>
    <CustomBtn @click="getAccounts">
      eth_accounts
    </CustomBtn>
    <CustomTextbox title="eth_accounts result">{{accountsResult}}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'BasicActions',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props: {
    ethereum: Object,
    default: null
  },
  data() {
      return {
          accounts: [],
          accountsResult: 'null',
          currentUrl: {},
          btnText: 'Connect',
          isDisabled: false
      };
  },
  computed: {
    isMetaMaskConnected() { return this.accounts && this.accounts.length > 0 },
    forwarderOrigin() { return this.currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined; }
  },
  methods: {
    async onClickConnect() {
        try {
            const newAccounts = await this.ethereum.request({
                method: 'eth_requestAccounts',
            });
            this.handleNewAccounts(newAccounts);
        } catch (error) {
            console.log(error);
        }
    },
    async getAccounts() {
      try {
        const _accounts = await this.ethereum.request({
          method: 'eth_accounts',
        });
        this.accountsResult =
          _accounts[0] || 'Not able to get accounts';
      } catch (err) {
        console.log(err);
        this.accountsResult = `Error: ${err.message}`;
      }
    },
    // Move to global helper class?
    handleNewAccounts(newAccounts) {
      this.accounts = newAccounts;
      if (this.isMetaMaskConnected) {
        console.log('connected');
        //initializeAccountButtons();
      }
      this.updateButtons();
    },
    updateButtons() {
      if (this.isMetaMaskConnected) {
        this.btnText = 'Connected';
        this.isDisabled = true;
      } else {
        this.btnText = 'Connect';
        this.isDisabled = false;
      }
    }
  }
});
</script>
