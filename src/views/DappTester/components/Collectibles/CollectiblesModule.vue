<template>
  <CustomCard title="Collectibles">
    <v-text-field
      hide-details
      v-model="collectibles.amount"
      variant="outlined"
      label="Amount"
      :disabled="disabled.amount"
    ></v-text-field>
    <CustomBtn @click="deployClick">Deploy</CustomBtn>
    <CustomBtn @click="mintClick" :disabled="disabled.mint">Mint</CustomBtn>
    <CustomTextbox style="overflow: auto" title="Collectibles">
      <pre>{{ collectibles.status }}</pre>
    </CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { reactive, type PropType, onMounted } from 'vue';
import { ethers } from 'ethers';
import {
  collectiblesAbi,
  collectiblesBytecode
} from '@/assets/json/constants.json';
import type { TypeCollectibles, TypeDisabled } from './types';

const props = defineProps({
  accounts: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

let ethersProvider = {} as ethers.providers.Web3Provider;
let ethersSigner = {} as ethers.Signer;
const collectibles: TypeCollectibles = reactive({
  amount: 1,
  status: ''
});
const disabled: TypeDisabled = reactive({
  mint: true,
  amount: true
});
let contract = {} as ethers.Contract;

onMounted(() => {
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  ethersSigner = ethersProvider.getSigner();
});

const deployClick = async () => {
  let Contract = {} as ethers.Contract;
  let receipt = {} as ethers.providers.TransactionReceipt;
  collectibles.status = 'Deploying';

  const collectiblesFactory = new ethers.ContractFactory(
    collectiblesAbi,
    collectiblesBytecode,
    ethersSigner
  );

  try {
    Contract = await collectiblesFactory.deploy();
    receipt = await Contract.deployTransaction.wait();
  } catch (error) {
    const err = error as Error;
    collectibles.status = `Deployment Failed\n${err.message}`;
  }
  if (Contract.address === undefined) {
    return;
  }
  const msg = `address:\n${Contract.address}\r\ntransactionHash:\n${receipt.transactionHash}`;
  contract = Contract;
  collectibles.status = `Deployed\r\n${msg}`;
  disabled.mint = false;
  disabled.amount = false;
};

const mintClick = async () => {
  collectibles.status = 'Mint initiated';
  let result = await contract.mintCollectibles(collectibles.amount, {
    from: props.accounts[0]
  });
  result = await result.wait();
  const txnHash = result.transactionHash;
  console.log(result);
  collectibles.status = `Mint completed\nTransaction Hash:\n${txnHash}`;
};
</script>
