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
      <v-col cols="12" md="4"><SendEth /></v-col>
      <v-col cols="12" md="4"><Contract /></v-col>
      <v-col cols="12" md="4"
        ><SendTokens :accounts="accounts" :ethers-signer="ethersSigner"
      /></v-col>
      <v-col cols="12" md="4"><FailingContract /></v-col>
      <v-col cols="12" md="4"
        ><CollectiblesModule :ethersSigner="ethersSigner" :accounts="accounts"
      /></v-col>
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

<script setup lang="ts">
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
import { ref, onUnmounted } from 'vue';

let fromAccount = ref<string>('');
let isConnected = ref<boolean>(false);
let networkId = ref<string>('');
let chainId = ref<string>('');
let ethersProvider = {} as ethers.providers.Web3Provider;
let ethereum = {};
let accounts = new Array<string>();
let ethersSigner = {} as ethers.Signer;

onUnmounted(() => {
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  ethereum = window.ethereum;
  ethersSigner = ethersProvider.getSigner();
});

const setAccounts = (accounts: string[]) => {
  accounts = accounts;
};
const setFromAccount = (account: string) => {
  fromAccount.value = account;
};
const setIsConnected = (bool: boolean) => {
  isConnected.value = bool;
};
const setChainId = (id: string) => {
  chainId.value = id;
};
const setNetworkId = (id: string) => {
  networkId.value = id;
};
</script>
