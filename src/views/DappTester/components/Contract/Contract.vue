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
let piggybankFactory;
let ethersProvider;
let contract;

ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');

piggybankFactory = new ethers.ContractFactory(
  piggybankAbi,
  piggybankBytecode,
  ethersProvider.getSigner()
);

export default defineComponent({
  name: 'ModuleContract',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data: () => {
    return {
      account: '',
      status: '',
      depositButtonDisabled: true,
      withdrawButtonDisabled: true
    };
  },
  methods: {
    async onClickDeploy() {
      this.status = 'Deploying';

      try {
        contract = await piggybankFactory.deploy();
        await contract.deployTransaction.wait();
      } catch (error) {
        this.status = 'Deployment Failed';
        throw error;
      }

      if (contract.address === undefined) {
        return;
      }

      console.log(
        `Contract mined! address: ${contract.address} transactionHash: ${contract.transactionHash}`
      );
      this.status = 'Deployed';
      this.depositButtonDisabled = false;
      this.withdrawButtonDisabled = false;

      console.log(contract);
    },
    async onClickDeposit() {
      this.status = 'Deposit initiated';
      const result = await contract.deposit({
        from: this.account,
        value: '0x3782dace9d900000'
      });
      console.log(result);
      const receipt = await result.wait();
      console.log(receipt);
      this.status = 'Deposit completed';
    },
    async onClickWithdraw() {
      const result = await contract.withdraw('0xde0b6b3a7640000', {
        from: this.account
      });
      console.log(result);
      const receipt = await result.wait();
      console.log(receipt);
      this.status = 'Withdrawn';
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
