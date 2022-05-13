<template>
  <CustomCard title="Failing Contract">
    <CustomBtn @click="onclickDeployFailingContract">
      Deploy Failing Contract
    </CustomBtn>
    <CustomBtn
      @click="onclickSendFailing"
      :disabled="sendFailingButtonDisabled"
    >
      Send Failing Transaction
    </CustomBtn>
    <CustomTextbox title="Failing Contract Status">
      {{ failingContractStatus }}
    </CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ethers } from 'ethers';
import { failingContractAbi, failingContractBytecode } from '@/constants.json';

const ethereum = window.ethereum;

let failingContractDeployed: unknown;
let ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
let failingContractFactory = new ethers.ContractFactory(
  failingContractAbi,
  failingContractBytecode,
  ethersProvider.getSigner()
);
let account = '';
let failingContractStatus = ref<string>('');
let sendFailingButtonDisabled = ref<boolean>(true);

const onclickDeployFailingContract = async () => {
  failingContractStatus.value = 'Deploying';

  try {
    failingContractDeployed = await failingContractFactory.deploy();
    await failingContractDeployed.deployTransaction.wait();
  } catch (error) {
    const err = error as Error;
    failingContractStatus.value = 'Deployment Failed';
    throw err;
  }

  if (failingContractDeployed.address === undefined) {
    return;
  }

  console.log(
    `Contract mined! address: ${failingContractDeployed.address} transactionHash: ${failingContractDeployed.transactionHash}`
  );
  failingContractStatus.value = 'Deployed';

  sendFailingButtonDisabled.value = false;
};

const onclickSendFailing = async () => {
  try {
    const result = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: failingContractDeployed.address,
          value: '0x0',
          gasLimit: '0x5028',
          maxFeePerGas: '0x2540be400',
          maxPriorityFeePerGas: '0x3b9aca00'
        }
      ]
    });
    failingContractStatus.value =
      'Failed transaction process completed as expected.';
    console.log('send failing contract result', result);
  } catch (error) {
    const err = error as Error;
    console.log('error', err);
    throw err;
  }
};

const getAccount = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    account = accounts[0];
  } catch (error) {
    const err = error as Error;
    console.log(err);
  }
};

getAccount();
</script>
