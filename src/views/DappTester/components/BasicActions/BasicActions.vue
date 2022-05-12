<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: {{ network }}</div>
    <div class="font-weight-bold">ChainId: {{ chainId }}</div>
    <div class="font-weight-bold">
      Accounts: {{ accounts.length > 0 ? accounts[0] : '' }}
    </div>
    <CustomBtn :disabled="isDisabled" @click="onClickConnect()">
      {{ btnText }}
    </CustomBtn>
    <CustomBtn @click="getAccounts()"> eth_accounts </CustomBtn>
    <CustomTextbox title="eth_accounts result">{{
      accountsResult
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ref, onMounted } from 'vue';

const accounts = ref<string[]>([]);
const accountsResult = ref<string>('');
const btnText = ref<string>('Connect');
const isDisabled = ref<boolean>(false);
const chainId = ref<string>('');
const network = ref<string>('');
const ethereum = window.ethereum;

onMounted(() => {
  initialize();
});

const isMetaMaskConnected = () => {
  return accounts.value && accounts.value.length > 0;
};
const onClickConnect = async () => {
  try {
    const newAccounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    handleNewAccounts(newAccounts);
  } catch (error) {
    return error;
  }
};
const getAccounts = async () => {
  try {
    const _accounts = await ethereum.request({
      method: 'eth_accounts'
    });
    accountsResult.value = _accounts[0] || 'Not able to get accounts';
  } catch (err) {
    accountsResult.value = `Error: ${err}`;
  }
};

const emits = defineEmits<{
  (e: 'setFromAccount', address: string): void;
  (e: 'setIsConnected', bool: boolean): void;
  (e: 'setChainId', chain: string): void;
  (e: 'setNeworkId', network: string): void;
}>();

const handleNewAccounts = newAccounts => {
  accounts.value = newAccounts;
  if (isMetaMaskConnected()) {
    emits('setFromAccount', accounts.value.toString());
    emits('setIsConnected', true);
  }
  updateButtons();
};

const handleNewChain = (chainID: string) => {
  chainId.value = chainID;
};

const handleNewNetwork = (networkID: string) => {
  network.value === networkID;
};

const getNetworkAndChainId = async () => {
  try {
    const chain = await ethereum.request({
      method: 'eth_chainId'
    });
    handleNewChain(chain);
    chainId.value = chain;
    emits('setChainId', chainId.value);
    const networkId = await ethereum.request({
      method: 'net_version'
    });
    handleNewNetwork(networkId);
    network.value = networkId;
    emits('setNeworkId', network.value.toString());
  } catch (err) {
    return err;
  }
};

const updateButtons = () => {
  if (isMetaMaskConnected()) {
    btnText.value = 'Connected';
    isDisabled.value = true;
  } else {
    btnText.value = 'Connect';
    isDisabled.value = false;
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
  ethereum.on('accountsChanged', (newAccounts: Array<string[]>) => {
    handleNewAccounts(newAccounts);
  });

  try {
    const newAccounts = await ethereum.request({
      method: 'eth_accounts'
    });
    handleNewAccounts(newAccounts);
  } catch (err) {
    return err;
  }
};
</script>
