<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="4"
        ><BasicActions @set-accounts="setAccounts"
      /></v-col>
      <v-col cols="12" md="4"><PermissionsActions /></v-col>
      <v-col cols="12" md="4"><SendEth /></v-col>
      <v-col cols="12" md="4"><Contract /></v-col>
      <v-col cols="12" md="4"
        ><SendTokens :accounts="accounts" :ethers-signer="ethersSigner"
      /></v-col>
      <v-col cols="12" md="4"><FailingContract /></v-col>
      <v-col cols="12" md="4"><Collectibles /></v-col>
      <v-col cols="12" md="4"><EncryptDecrypt /></v-col>
      <v-col cols="12" md="4"><EthSign /></v-col>
      <v-col cols="12" md="4"><PersonalSign /></v-col>
      <v-col cols="12" md="4"><SignTypedData /></v-col>
      <v-col cols="12" md="4"><SignTypedDataV3 /></v-col>
      <v-col cols="12" md="4"><SignTypedDataV4 /></v-col>
      <v-col cols="12" md="4"><EthereumChainInteractions /></v-col>
      <v-col cols="12" md="4"><SendForm /></v-col>
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
import Collectibles from './components/Collectibles/Collectibles.vue';
import EncryptDecrypt from './components/EncryptDecrypt/EncryptDecrypt.vue';
import EthSign from './components/EthSign/EthSign.vue';
import PersonalSign from './components/PersonalSign/PersonalSign.vue';
import SignTypedData from './components/SignTypedData/SignTypedData.vue';
import SignTypedDataV3 from './components/SignTypedDataV3/SignTypedDataV3.vue';
import SignTypedDataV4 from './components/SignTypedDataV4/SignTypedDataV4.vue';
import EthereumChainInteractions from './components/EthereumChainInteractions/EthereumChainInteractions.vue';
import SendForm from './components/SendForm/SendForm.vue';

import { defineComponent } from 'vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'DappTester',
  components: {
    BasicActions,
    PermissionsActions,
    SendEth,
    SendTokens,
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
  data() {
    return {
      ethersProvider: {} as ethers.providers.Web3Provider,
      ethereum: {},
      accounts: new Array<string>(),
      ethersSigner: {} as ethers.Signer
    };
  },
  mounted() {
    // We must specify the network as 'any' for ethers to allow network changes
    this.ethersProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    );
    this.ethereum = window.ethereum;
    this.ethersSigner = this.ethersProvider.getSigner();
  },
  methods: {
    setAccounts(accounts: Array<string>) {
      this.accounts = accounts;
    }
  }
});
</script>
