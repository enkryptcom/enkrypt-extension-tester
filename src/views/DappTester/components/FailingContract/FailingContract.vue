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
    <CustomTextbox title="Failing Contract Status">{{
      failingContractStatus
    }}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ethers } from 'ethers';
import {
  hstBytecode,
  hstAbi,
  piggybankBytecode,
  piggybankAbi,
  collectiblesAbi,
  collectiblesBytecode,
  failingContractAbi,
  failingContractBytecode
} from '@/constants.json';

const ethereum = window.ethereum;
let failingContractDeployed;
let failingContractFactory;
let ethersProvider;

ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');

failingContractFactory = new ethers.ContractFactory(
  failingContractAbi,
  failingContractBytecode,
  ethersProvider.getSigner()
);

export default defineComponent({
  name: 'ModuleFailingContract',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data: () => {
    return {
      account: '',
      failingContractStatus: '',
      sendFailingButtonDisabled: true
    };
  },
  methods: {
    async onclickDeployFailingContract() {
      this.failingContractStatus = 'Deploying';

      try {
        failingContractDeployed = await failingContractFactory.deploy();
        await failingContractDeployed.deployTransaction.wait();
      } catch (error) {
        this.failingContractStatus = 'Deployment Failed';
        throw error;
      }

      if (failingContractDeployed.address === undefined) {
        return;
      }

      console.log(
        `Contract mined! address: ${failingContractDeployed.address} transactionHash: ${failingContractDeployed.transactionHash}`
      );
      this.failingContractStatus = 'Deployed';

      this.sendFailingButtonDisabled = false;
    },
    async onclickSendFailing() {
      try {
        const result = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: this.account,
              to: failingContractDeployed.address,
              value: '0x0',
              gasLimit: '0x5028',
              maxFeePerGas: '0x2540be400',
              maxPriorityFeePerGas: '0x3b9aca00'
            }
          ]
        });
        this.failingContractStatus =
          'Failed transaction process completed as expected.';
        console.log('send failing contract result', result);
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    },
    async getAccount() {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        this.account = accounts[0];
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.getAccount();
  }
});
</script>
