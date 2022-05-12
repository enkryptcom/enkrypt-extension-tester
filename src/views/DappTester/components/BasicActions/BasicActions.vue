<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: {{ network }}</div>
    <div class="font-weight-bold">ChainId: {{ chainId }}</div>
    <div class="font-weight-bold">
      Accounts: {{ accounts.list.length > 0 ? accounts.list[0] : '' }}
    </div>
    <CustomBtn :disabled="button.disabled" @click="onClickConnect">
      {{ button.text }}
    </CustomBtn>
    <CustomBtn @click="getAccounts"> eth_accounts </CustomBtn>
    <CustomTextbox title="eth_accounts result">{{
      accounts.result
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { reactive, ref } from 'vue';
import type { TypeAccounts, TypeButton } from './types';

const accounts: TypeAccounts = reactive({
  list: [],
  result: ''
});
const button: TypeButton = reactive({
  disabled: false,
  text: 'Connect'
});
const chainId = ref<string>('');
const network = ref<string>('');
const ethereum = window.ethereum;

const emits = defineEmits<{
  (e: 'setAccounts', newAccounts: string[]): void;
}>();

const isMetaMaskConnected = () => {
  return accounts.list && accounts.list.length > 0;
};
const onClickConnect = async () => {
  try {
    const newAccounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    handleNewAccounts(newAccounts);
  } catch (error) {
    console.log(error);
  }
};
const getAccounts = async () => {
  try {
    const _accounts = await ethereum.request({
      method: 'eth_accounts'
    });
    accounts.result = _accounts[0] || 'Not able to get accounts';
  } catch (err) {
    console.log(err);
    accounts.result = `Error: ${err}`;
  }
};

const handleNewAccounts = (newAccounts: string[]) => {
  accounts.list = newAccounts;
  if (isMetaMaskConnected()) {
    emits('setAccounts', newAccounts);
  }
  updateButtons();
};

const handleNewChain = (chainID: string) => {
  chainId.value = chainID;
};

const handleNewNetwork = (networkID: string) => {
  network.value = networkID;
};

const getNetworkAndChainId = async () => {
  try {
    const chain = await ethereum.request({
      method: 'eth_chainId'
    });
    handleNewChain(chain);

    const networkId = await ethereum.request({
      method: 'net_version'
    });
    handleNewNetwork(networkId);
  } catch (err) {
    console.error(err);
  }
};

const updateButtons = () => {
  if (isMetaMaskConnected()) {
    button.text = 'Connected';
    button.disabled = true;
  } else {
    button.text = 'Connect';
    button.disabled = false;
  }
};

const initialize = async () => {
  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.on('chainChanged', (chain: string) => {
    handleNewChain(chain);
  });
  ethereum.on('chainChanged', handleNewNetwork);
  ethereum.on('accountsChanged', (newAccounts: string[]) => {
    handleNewAccounts(newAccounts);
  });

  try {
    const newAccounts = await ethereum.request({
      method: 'eth_accounts'
    });
    handleNewAccounts(newAccounts);
  } catch (err) {
    console.log('Error on init when getting accounts', err);
  }
};

initialize();
</script>
