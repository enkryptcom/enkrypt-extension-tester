<template>
  <CustomCard title="Send Tokens">
    <div class="font-weight-bold">Token: {{ tokenAddress }}</div>
    <CustomBtn @click="createToken">Create Token</CustomBtn>
    <CustomBtn :disabled="watchDisabled" @click="watchAssetClick"
      >Add Token to Wallet</CustomBtn
    >
    <CustomBtn :disabled="transferDisabled" @click="transferTokensClick"
      >Transfer Tokens</CustomBtn
    >
    <CustomBtn :disabled="approveDisabled" @click="approveTokensClick"
      >Approve Tokens</CustomBtn
    >
    <CustomBtn
      :disabled="transferNoGasDisabled"
      @click="transferTokensWithoutGasClick"
      >Transfer Tokens Without Gas</CustomBtn
    >
    <CustomBtn
      :disabled="approveNoGasDisabled"
      @click="approveTokensWithoutGasClick"
      >Approve Tokens Without Gas</CustomBtn
    >
  </CustomCard>
</template>

<script setup lang="ts">
import { ethers } from 'ethers';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { hstBytecode, hstAbi } from '@/assets/json/constants.json';
import { ref, type PropType } from 'vue';

const props = defineProps({
  accounts: {
    type: Array,
    default: () => {
      return {};
    }
  },
  ethersSigner: {
    type: Object as PropType<ethers.Signer>,
    default: () => {
      return {};
    }
  }
});

let tokenAddress = ref('null');
let watchDisabled = ref(true);
let transferDisabled = ref(true);
let approveDisabled = ref(true);
let transferNoGasDisabled = ref(true);
let approveNoGasDisabled = ref(true);
let contract = {} as ethers.Contract;
let _initialAmount = 100;
let _tokenName = 'TST';
let _decimalUnits = 4;
let _tokenSymbol = 'TST';
const ethereum = window.ethereum;

async function createToken() {
  try {
    const hstFactory = new ethers.ContractFactory(
      hstAbi,
      hstBytecode,
      props.ethersSigner
    );
    const Contract = await hstFactory.deploy(
      _initialAmount,
      _tokenName,
      _decimalUnits,
      _tokenSymbol
    );
    const receipt = await Contract.deployTransaction.wait();
    if (Contract.address === undefined) {
      return undefined;
    }
    console.log(receipt);
    console.log(
      `Contract mined! address: ${Contract.address} transactionHash: ${receipt.transactionHash}`
    );
    tokenAddress.value = Contract.address;
    contract = Contract;
    watchDisabled.value = false;
    transferDisabled.value = false;
    approveDisabled.value = false;
    transferNoGasDisabled.value = false;
    approveNoGasDisabled.value = false;
  } catch (error) {
    tokenAddress.value = 'Creation Failed';
    throw error;
  }
}

async function watchAssetClick() {
  if (tokenAddress.value == 'Creation Failed' || tokenAddress.value == 'null')
    return;
  const result = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress.value,
        symbol: _tokenSymbol,
        decimals: _decimalUnits,
        image: '@/assets/images/logo-mew.svg'
      }
    }
  });
  console.log('addToken', result);
}

async function transferTokensClick() {
  const result = await contract.transfer(
    '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
    '15000',
    {
      from: props.accounts[0],
      gasLimit: 60000,
      gasPrice: '20000000000'
    }
  );
  console.log('transfer', result);
}

async function approveTokensClick() {
  const result = await contract.approve(
    '0x9bc5baF874d2DA8D216aE9f137804184EE5AfEF4',
    '70000',
    {
      from: props.accounts[0],
      gasLimit: 60000,
      gasPrice: '20000000000'
    }
  );
  console.log('approve', result);
}

async function transferTokensWithoutGasClick() {
  const result = await contract.transfer(
    '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
    '15000',
    {
      gasPrice: '20000000000'
    }
  );
  console.log('transferWithoutGas', result);
}

async function approveTokensWithoutGasClick() {
  const result = await contract.approve(
    '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
    '70000',
    {
      gasPrice: '20000000000'
    }
  );
  console.log('approveWithoutGas', result);
}
</script>
