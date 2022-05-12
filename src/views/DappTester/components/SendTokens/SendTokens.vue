<template>
  <CustomCard title="Send Tokens">
    <div class="font-weight-bold">Token: {{ tokenAddress }}</div>
    <CustomBtn @click="createToken">Create Token</CustomBtn>
    <CustomBtn :disabled="disabled.watch" @click="watchAssetClick"
      >Add Token to Wallet</CustomBtn
    >
    <CustomBtn :disabled="disabled.transfer" @click="transferTokensClick"
      >Transfer Tokens</CustomBtn
    >
    <CustomBtn :disabled="disabled.approve" @click="approveTokensClick"
      >Approve Tokens</CustomBtn
    >
    <CustomBtn
      :disabled="disabled.transferNoGas"
      @click="transferTokensWithoutGasClick"
      >Transfer Tokens Without Gas</CustomBtn
    >
    <CustomBtn
      :disabled="disabled.approveNoGas"
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
import { reactive, ref, type PropType } from 'vue';
import type { TypeDisabled } from './types';

const props = defineProps({
  accounts: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  ethersSigner: {
    type: Object as PropType<ethers.Signer>,
    default: () => ({})
  }
});

const tokenAddress = ref<string>('');
const disabled: TypeDisabled = reactive({
  watch: true,
  transfer: true,
  approve: true,
  transferNoGas: true,
  approveNoGas: true
});
let contract = {} as ethers.Contract;
const _initialAmount = 100;
const _tokenName = 'TST';
const _decimalUnits = 4;
const _tokenSymbol = 'TST';
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
    disabled.watch = false;
    disabled.transfer = false;
    disabled.approve = false;
    disabled.transferNoGas = false;
    disabled.approveNoGas = false;
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
