<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="4"
        ><BasicActions
          :ethereum="ethereum"
          @setChainId="setChainId"
          @setNetworkId="setNetworkId"
          @setFromAccount="setFromAccount"
          @set-accounts="setAccounts"
          @setIsConnected="setIsConnected"
      /></v-col>
      <v-col cols="12" md="4"><PermissionsActions /></v-col>
      <v-col cols="12" md="4">
        <SendEth :ethereum="ethereum" :signer="ethersSigner" />
      </v-col>
      <v-col cols="12" md="4"><Contract /></v-col>
      <v-col cols="12" md="4"
        ><SendTokens :accounts="accounts" :ethers-signer="ethersSigner"
      /></v-col>
      <v-col cols="12" md="4"><FailingContract /></v-col>
      <v-col cols="12" md="4"
        ><CollectiblesModule :ethersSigner="ethersSigner" :accounts="accounts"
      /></v-col>
      <v-col cols="12" md="4"><EncryptDecrypt /></v-col>
      <v-col cols="12" md="4"><EthSign :signer="ethersSigner" /></v-col>
      <v-col cols="12" md="4"><PersonalSign /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedData
          :ethereum="ethereum"
          :from-account="fromAccount"
          :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedDataV3
          :ethereum="ethereum"
          :from-account="fromAccount"
          :is-connected="isConnected"
          :network-id="networkId"
          :chain-id="chainId"
      /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedDataV4
          :ethereum="ethereum"
          :from-account="fromAccount"
          :is-connected="isConnected"
          :network-id="networkId"
          :chain-id="chainId"
      /></v-col>
      <v-col cols="12" md="4"
        ><EthereumChainInteractions :ethereum="ethereum"
      /></v-col>
      <v-col cols="12" md="4"
        ><SendForm
          :ethereum="ethereum"
          :from-account="fromAccount"
          :is-connected="isConnected"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BasicActions from './components/BasicActions/BasicActions.vue';
import PermissionsActions from './components/PermissionsActions/PermissionsActions.vue';
import SendEth from './components/SendEth/SendEth.vue';
import Contract from './components/Contract/Contract.vue';
import FailingContract from './components/FailingContract/FailingContract.vue';
import SendTokens from './components/SendTokens/SendTokens.vue';
import CollectiblesModule from './components/Collectibles/CollectiblesModule.vue';
import EncryptDecrypt from './components/EncryptDecrypt/EncryptDecrypt.vue';
import EthSign from './components/EthSign/EthSign.vue';
import PersonalSign from './components/PersonalSign/PersonalSign.vue';
import SignTypedData from './components/SignTypedData/SignTypedData.vue';
import SignTypedDataV3 from './components/SignTypedDataV3/SignTypedDataV3.vue';
import SignTypedDataV4 from './components/SignTypedDataV4/SignTypedDataV4.vue';
import EthereumChainInteractions from './components/EthereumChainInteractions/EthereumChainInteractions.vue';
import SendForm from './components/SendForm/SendForm.vue';
import { ethers } from 'ethers';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DappTester',
  data() {
    return {
      fromAccount: '',
      isConnected: false,
      networkId: '',
      chainId: '',
      ethersProvider: {} as ethers.providers.Web3Provider,
      ethereum: {},
      accounts: new Array<string>(),
      ethersSigner: {} as ethers.Signer
    };
  },
  components: {
    BasicActions,
    PermissionsActions,
    SendEth,
    SendTokens,
    Contract,
    FailingContract,
    CollectiblesModule,
    EncryptDecrypt,
    EthSign,
    PersonalSign,
    SignTypedData,
    SignTypedDataV3,
    SignTypedDataV4,
    EthereumChainInteractions,
    SendForm
  },
  mounted() {
    // We must specify the network as 'any' for ethers to allow network changes
    this.ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
    this.ethereum = window.ethereum;
    this.ethersSigner = this.ethersProvider.getSigner();
    // this.getNewNetwork();
  },
  methods: {
    setAccounts(accounts) {
      this.accounts = accounts;
    },
    setFromAccount(account) {
      this.fromAccount = account;
    },
    setIsConnected(bool) {
      this.isConnected = bool;
    },
    setChainId(id) {
      this.chainId = id;
    },
    setNetworkId(id) {
      this.networkId = id;
    }
  }
});
</script>
