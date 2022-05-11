<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="4"
        ><BasicActions
          :ethereum="ethereum"
          @setChainId="setChainId"
          @setNetworkId="setNetworkId"
          @setFromAccount="setFromAccount"
          @setIsConnected="setIsConnected"
      /></v-col>
      <v-col cols="12" md="4"><PermissionsActions /></v-col>
      <v-col cols="12" md="4"><SendEth /></v-col>
      <v-col cols="12" md="4"><Contract /></v-col>
      <v-col cols="12" md="4"><FailingContract /></v-col>
      <v-col cols="12" md="4"><Collectibles /></v-col>
      <v-col cols="12" md="4"><EncryptDecrypt /></v-col>
      <v-col cols="12" md="4"><EthSign /></v-col>
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
      <v-col cols="12" md="4"><EthereumChainInteractions /></v-col>
      <v-col cols="12" md="4"><SendForm /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import BasicActions from './components/BasicActions/BasicActions.vue';
import PermissionsActions from './components/PermissionsActions/PermissionsActions.vue';
import SendEth from './components/SendEth/SendEth.vue';
import Contract from './components/Contract/Contract.vue';
import FailingContract from './components/FailingContract/FailingContract.vue';
import Collectibles from './components/Collectibles/Collectibles.vue';
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
      ethersProvider: {},
      ethereum: {},
      networkId: '',
      chainId: ''
    };
  },
  components: {
    BasicActions,
    PermissionsActions,
    SendEth,
    Contract,
    FailingContract,
    Collectibles,
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
    // this.getNewNetwork();
  },
  methods: {
    // async getNewNetwork() {
    //   try {
    //     const networkId = await this.ethereum.request({
    //       method: 'net_version'
    //     });
    //     this.networkId = networkId;
    //     const chainId = await this.ethereum.request({
    //       method: 'eth_chainId'
    //     });
    //     this.chainId = chainId;
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
    setFromAccount(account) {
      // console.log('setFromAccount emitted and received', account);
      this.fromAccount = account;
    },
    setIsConnected(bool) {
      // console.log('setIsConncted emitted and received', bool);
      this.isConnected = bool;
    },
    setChainId(id) {
      // console.log('setChainId emitted and received', id);
      this.chainId = id;
    },
    setNetworkId(id) {
      // console.log('setNetworkId emitted and received', id);
      this.networkid = id;
    }
  }
});
</script>
