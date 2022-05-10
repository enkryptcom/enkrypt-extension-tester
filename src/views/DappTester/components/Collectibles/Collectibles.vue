<template>
  <CustomCard title="Collectibles">
    <v-text-field
      hide-details
      v-model="amount"
      variant="outlined"
      label="Amount"
      :disabled="mintAmountDisabled"
    ></v-text-field>
    <CustomBtn @click="deployClick">Deploy</CustomBtn>
    <CustomBtn @click="mintClick" :disabled="mintDisabled">Mint</CustomBtn>
    <CustomTextbox title="Collectibles">{{collectiblesStatus}}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

import { ethers } from 'ethers';
import {
  collectiblesAbi,
  collectiblesBytecode
} from '@/assets/json/constants.json';

export default defineComponent({
  name: 'ModuleCollectibles',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props:{
    ethersSigner: {
      type: Object,
      default: null
    },
    accounts: {
      type: Array,
      default: []
    }
  },
  data: () => {
    return { 
      amount: 1,
      collectiblesStatus: '',
      mintDisabled: true,
      mintAmountDisabled: true,
      contract: {}
    };
  },
  methods:{
    async deployClick() {
      let contract;
      let receipt;
      this.collectiblesStatus = 'Deploying';

    const collectiblesFactory = new ethers.ContractFactory(
      collectiblesAbi,
      collectiblesBytecode,
      this.ethersSigner
    );
    

      try {
        contract = await collectiblesFactory.deploy();
        receipt = await contract.deployTransaction.wait();
      } catch (error) {
        this.collectiblesStatus = 'Deployment Failed';
        throw error;
      }
      if (contract.address === undefined) {
        return;
      }
      console.log(
        `Contract mined! address: ${contract.address} transactionHash: ${receipt.transactionHash}`,
      );
      this.contract = contract;
      this.collectiblesStatus = 'Deployed';
      this.mintDisabled = false;
      this.mintAmountDisabled = false;
    },
    async mintClick() {
      this.collectiblesStatus = 'Mint initiated';
      let result = await this.contract.mintCollectibles(this.amount, {
        from: this.accounts[0],
      });
      result = await result.wait();
      console.log(result);
      this.collectiblesStatus = 'Mint completed';
    }
  }
});
</script>
