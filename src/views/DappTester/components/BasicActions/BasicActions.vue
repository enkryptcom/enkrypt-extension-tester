<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: {{ network }}</div>
    <div class="font-weight-bold">ChainId: {{ chainId }}</div>
    <div class="font-weight-bold">
      Accounts: {{ accounts.length > 0 ? accounts[0] : '' }}
    </div>
    <CustomBtn :disabled="isDisabled" @click="onClickConnect">
      {{ btnText }}
    </CustomBtn>
    <CustomBtn @click="getAccounts"> eth_accounts </CustomBtn>
    <CustomTextbox title="eth_accounts result">{{
        accountsResult
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const propsVar = defineProps({
  handleEIP1559Support: {
    default: () => ({}),
    type: Function
  }
});

let accounts = new Array<unknown>();
let accountsResult = 'null';
let btnText = 'Connect';
let isDisabled = false;
let chainId = 'null';
let network = 'null';
let ethereum = window.ethereum;

const isMetaMaskConnected = () => {
  return accounts && accounts.length > 0;
};
const onClickConnect = async () => {
  console.log(ethereum);
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
    accountsResult = _accounts[0] || 'Not able to get accounts';
  } catch (err) {
    console.log(err);
    accountsResult = `Error: ${err}`;
  }
};

const handleNewAccounts = (newAccounts: Array<unknown>) => {
  accounts = newAccounts;
  if (isMetaMaskConnected()) {
    //initializeAccountButtons();
  }
  updateButtons();
};

const handleNewChain = (chainID: string) => {
  chainId = chainID;
};

const handleNewNetwork = (networkID: string) => {
  network = parseInt(networkID).toString();
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

    const block = await ethereum.request({
      method: 'eth_getBlockByNumber',
      params: ['latest', false]
    });

    propsVar.handleEIP1559Support(block.baseFeePerGas !== undefined);
  } catch (err) {
    console.error(err);
  }
};

const updateButtons = () => {
  if (isMetaMaskConnected()) {
    btnText = 'Connected';
    isDisabled = true;
  } else {
    btnText = 'Connect';
    isDisabled = false;
  }
};

const initialize = async () => {
  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.on('chainChanged', (chain: string) => {
    handleNewChain(chain);
    /*
    ethereum
      .request({
        method: 'eth_getBlockByNumber',
        params: ['latest', false]
      })
      .then((block: { baseFeePerGas: undefined }) => {
        propsVar.handleEIP1559Support(block.baseFeePerGas !== undefined);
      });
      */
  });
  ethereum.on('chainChanged', handleNewNetwork);
  ethereum.on('accountsChanged', (newAccounts: Array<unknown>) => {
    /*
    ethereum
      .request({
        method: 'eth_getBlockByNumber',
        params: ['latest', false]
      })
      .then((block: { baseFeePerGas: undefined }) => {
        propsVar.handleEIP1559Support(block.baseFeePerGas !== undefined);
      });
    */
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
