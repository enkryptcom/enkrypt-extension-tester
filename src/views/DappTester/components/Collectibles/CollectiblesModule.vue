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
    <CustomTextbox title="Collectibles">{{
      collectibles.status
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { reactive } from 'vue';

import { ethers } from 'ethers';
import {
  collectiblesAbi,
  collectiblesBytecode
} from '@/assets/json/constants.json';

const props = defineProps({
  ethersSigner: {
    type: Object,
    required: true
  },
  accounts: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
const collectibles = reactive({
  amount: 1,
  status: ''
});
const disabled = reactive({
  mint: true,
  amount: true
});
let contract = {} as ethers.Contract;

async function deployClick() {
  let Contract;
  let receipt;
  collectibles.status = 'Deploying';

  const collectiblesFactory = new ethers.ContractFactory(
    collectiblesAbi,
    collectiblesBytecode,
    props.ethersSigner as ethers.Signer
  );

  try {
    Contract = await collectiblesFactory.deploy();
    receipt = await Contract.deployTransaction.wait();
  } catch (error) {
    collectibles.status = 'Deployment Failed';
    throw error;
  }
  if (Contract.address === undefined) {
    return;
  }
  console.log(
    `Contract mined! address: ${Contract.address} transactionHash: ${receipt.transactionHash}`
  );
  contract = Contract;
  collectibles.status = 'Deployed';
  disabled.mint = false;
  disabled.amount = false;
}

async function mintClick() {
  collectibles.status = 'Mint initiated';
  let result = await contract.mintCollectibles(collectibles.amount, {
    from: props.accounts[0]
  });
  result = await result.wait();
  console.log(result);
  collectibles.status = 'Mint completed';
}
</script>
