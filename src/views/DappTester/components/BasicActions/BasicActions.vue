<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: {{network}}</div>
    <div class="font-weight-bold">ChainId: {{chainId}}</div>
    <div class="font-weight-bold">Accounts: {{accounts.length > 0 ? accounts[0] : ''}}</div>
    <CustomBtn 
      :disabled="isDisabled"
      @click="onClickConnect"
    >
      {{btnText}}
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
    ethereum: {
      type: Object,
      default: null
    },
    handleEIP1559Support: {
      default: function () {
        return {};
      },
      type: Function
    }
  },
  data() {
      return {
          accounts: [],
          accountsResult: 'null',
          currentUrl: {},
          btnText: 'Connect',
          isDisabled: false,
          chainId: 'null',
          network: 'null'
      };
  },
  watch: {
    ethereum: {
      handler: function() {
        this.initialize();
      }
    }
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
        //initializeAccountButtons();
      }
      this.updateButtons();
    },
    handleNewChain(chainId) {
      this.chainId = chainId;
    },
    handleNewNetwork(networkId) {
      this.network = parseInt(networkId);
    },
    async getNetworkAndChainId() {
      try {
        const chainId = await this.ethereum.request({
          method: 'eth_chainId',
        });
        this.handleNewChain(chainId);

        const networkId = await this.ethereum.request({
          method: 'net_version',
        });
        this.handleNewNetwork(networkId);
        /*
        const block = await this.ethereum.request({
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
        });
        
        this.handleEIP1559Support(block.baseFeePerGas !== undefined);
        */
      } catch (err) {
        console.error(err);
      }
    },
    updateButtons() {
      if (this.isMetaMaskConnected) {
        this.btnText = 'Connected';
        this.isDisabled = true;
      } else {
        this.btnText = 'Connect';
        this.isDisabled = false;
      }
    },
    async initialize() {
      this.ethereum.autoRefreshOnNetworkChange = false;
      this.getNetworkAndChainId();

      this.ethereum.autoRefreshOnNetworkChange = false;
      this.getNetworkAndChainId();

      this.ethereum.on('chainChanged', (chain) => {
        this.handleNewChain(chain);
        /*
        this.ethereum
          .request({
            method: 'eth_getBlockByNumber',
            params: ['latest', false],
          })
          .then((block) => {
            this.handleEIP1559Support(block.baseFeePerGas !== undefined);
          });
        */
      });
      this.ethereum.on('chainChanged', this.handleNewNetwork);
      this.ethereum.on('accountsChanged', (newAccounts) => {
        /*
        this.ethereum
          .request({
            method: 'eth_getBlockByNumber',
            params: ['latest', false],
          })
          .then((block) => {
            this.handleEIP1559Support(block.baseFeePerGas !== undefined);
            
          });
          */
        this.handleNewAccounts(newAccounts);
      });

      try {
        const newAccounts = await this.ethereum.request({
          method: 'eth_accounts',
        });
        this.handleNewAccounts(newAccounts);
      } catch (err) {
        console.log('Error on init when getting accounts', err);
      }
    }
  }
});
</script>
