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

const accounts = ref(new Array<null>());
const accountsResult = ref<string>('');
const btnText = ref<string>('Connect');
const isDisabled = ref<boolean>(false);
const chainId = ref<string>('');
const network = ref<string>('');
const ethereum = window.ethereum;

// const props = defineProps({
//   ethereum: {
//     type: Object,
//     default: null
//   }
// });

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
    console.log('onClickConnect newAccounts:', newAccounts.toString());
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
    accountsResult.value = _accounts[0] || 'Not able to get accounts';
  } catch (err) {
    console.log(err);
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
    console.log(`accountEmit has been triggered!`);
    //initializeAccountButtons();
  }
  updateButtons();
};

const handleNewChain = (chainID: string) => {
  chainId.value = chainID;
};

const handleNewNetwork = (networkID: string) => {
  network.value = parseInt(networkID).toString();
};

const getNetworkAndChainId = async () => {
  try {
    const chain = await ethereum.request({
      method: 'eth_chainId'
    });
    handleNewChain(chain);
    chainId.value = chain;
    emits('setChainId', chainId.value.toString());
    const networkId = await ethereum.request({
      method: 'net_version'
    });
    handleNewNetwork(networkId);
    network.value = networkId;
    emits('setNeworkId', network.value.toString());

    /*
    const block = await ethereum.request({
      method: 'eth_getBlockByNumber',
      params: ['latest', false]
    });

    props.handleEIP1559Support(block.baseFeePerGas !== undefined);
    */
  } catch (err) {
    console.error(err);
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
    console.error('Error on init when getting accounts', err);
  }
};
</script>
