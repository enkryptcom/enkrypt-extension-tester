<template>
  <CustomCard title="Contract">
    <CustomBtn @click="onClickDeploy">Deploy Contract</CustomBtn>
    <CustomBtn @click="onClickDeposit" :disabled="depositButtonDisabled">
      Deposit
    </CustomBtn>
    <CustomBtn @click="onClickWithdraw" :disabled="withdrawButtonDisabled">
      Withdraw
    </CustomBtn>
    <CustomTextbox title="Status">{{ status }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ethers } from 'ethers';
import { piggybankBytecode, piggybankAbi } from '@/constants.json';

const ethereum = window.ethereum;

let contract: unknown;
let account = '';
let status = ref<string>('');
let depositButtonDisabled = ref<boolean>(true);
let withdrawButtonDisabled = ref<boolean>(true);

const ethersProvider = new ethers.providers.Web3Provider(
  window.ethereum,
  'any'
);

const piggybankFactory = new ethers.ContractFactory(
  piggybankAbi,
  piggybankBytecode,
  ethersProvider.getSigner()
);

const onClickDeploy = async () => {
  status.value = 'Deploying';

  try {
    contract = await piggybankFactory.deploy();
    await contract.deployTransaction.wait();
  } catch (error) {
    status.value = 'Deployment Failed';
    throw error;
  }

  if (contract.address === undefined) {
    return;
  }

  console.log(
    `Contract mined! address: ${contract.address} transactionHash: ${contract.transactionHash}`
  );
  status.value = 'Deployed';
  depositButtonDisabled.value = false;
  withdrawButtonDisabled.value = false;

  console.log(contract);
};

const onClickDeposit = async () => {
  status.value = 'Deposit initiated';
  const result = await contract.deposit({
    from: account.value,
    value: '0x3782dace9d900000'
  });
  console.log(result);
  const receipt = await result.wait();
  console.log(receipt);
  status.value = 'Deposit completed';
};

const onClickWithdraw = async () => {
  const result = await contract.withdraw('0xde0b6b3a7640000', {
    from: account.value
  });
  console.log(result);
  const receipt = await result.wait();
  console.log(receipt);
  status.value = 'Withdrawn';
};

const getAccount = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    account.value = accounts[0];
  } catch (e) {
    console.log(e);
  }
};

getAccount();
</script>
