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
      <v-col cols="12" md="4"><SendEth :from-account="fromAccount" /></v-col>
      <v-col cols="12" md="4"><Contract /></v-col>
      <v-col cols="12" md="4"><SendTokens :accounts="accounts" /></v-col>
      <v-col cols="12" md="4"
        ><FailingContract
          :from-account="fromAccount"
          :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><CollectiblesModule :accounts="accounts"
      /></v-col>
      <v-col cols="12" md="4"
        ><EncryptDecrypt
          :from-account="fromAccount"
          :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><EthSign :from-account="fromAccount" :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><PersonalSign :from-account="fromAccount" :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedData :from-account="fromAccount" :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedDataV3
          :from-account="fromAccount"
          :is-connected="isConnected"
          :network-id="networkId"
          :chain-id="chainId"
      /></v-col>
      <v-col cols="12" md="4"
        ><SignTypedDataV4
          :from-account="fromAccount"
          :is-connected="isConnected"
          :network-id="networkId"
          :chain-id="chainId"
      /></v-col>
      <v-col cols="12" md="4"
        ><EthereumChainInteractions :is-connected="isConnected"
      /></v-col>
      <v-col cols="12" md="4"
        ><SendForm :from-account="fromAccount" :is-connected="isConnected"
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
import { ref, onMounted } from 'vue';

const fromAccount = ref<string>('');
const isConnected = ref<boolean>(false);
const networkId = ref<string>('');
const chainId = ref<string>('');
let ethereum = {};
let accounts = new Array<string>();

onMounted(() => {
  ethereum = window.ethereum;
});

const setAccounts = (Accounts: string[]) => {
  accounts = Accounts;
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
