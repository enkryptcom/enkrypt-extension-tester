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

<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from 'ethers';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { hstBytecode, hstAbi } from '@/assets/json/constants.json';

export default defineComponent({
  name: 'SendTokens',
  components: { CustomCard, CustomBtn },
  props: {
    ethereum: {
      type: Object,
      default: null
    },
    accounts: {
      type: Array,
      default: {}
    },
    ethersSigner: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      tokenAddress: 'null',
      watchDisabled: true,
      transferDisabled: true,
      approveDisabled: true,
      transferNoGasDisabled: true,
      approveNoGasDisabled: true,
      contract: {}
    };
  },
  methods: {
    async createToken() {
      const _initialAmount = 100;
      const _tokenName = 'TST';
      const _decimalUnits = 4;
      const _tokenSymbol = 'TST';

      try {
        const hstFactory = new ethers.ContractFactory(
          hstAbi,
          hstBytecode,
          this.ethersSigner as ethers.Signer
        );
        const contract = await hstFactory.deploy(
          _initialAmount,
          _tokenName,
          _decimalUnits,
          _tokenSymbol
        );
        const receipt = await contract.deployTransaction.wait();
        if (contract.address === undefined) {
          return undefined;
        }
        console.log(receipt);
        console.log(
          `Contract mined! address: ${contract.address} transactionHash: ${receipt.transactionHash}`
        );
        this.tokenAddress = contract.address;
        this.contract = contract;
        this.watchDisabled = false;
        this.transferDisabled = false;
        this.approveDisabled = false;
        this.transferNoGasDisabled = false;
        this.approveNoGasDisabled = false;
      } catch (error) {
        this.tokenAddress = 'Creation Failed';
        throw error;
      }
    },
    async watchAssetClick() {
      if (this.tokenAddress == 'Creation Failed' || this.tokenAddress == 'null')
        return;
      const result = await this.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: this.tokenAddress,
            symbol: await this.contract.symbol(),
            decimals: await this.contract.decimals(),
            image: '@/assets/images/logo-mew.svg'
          }
        }
      });
      console.log('result', result);
    },
    async transferTokensClick() {
      const result = await this.contract.transfer(
        '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
        '15000',
        {
          from: this.accounts[0],
          gasLimit: 60000,
          gasPrice: '20000000000'
        }
      );
      console.log('result', result);
    },
    async approveTokensClick() {
      const result = await this.contract.approve(
        '0x9bc5baF874d2DA8D216aE9f137804184EE5AfEF4',
        '70000',
        {
          from: this.accounts[0],
          gasLimit: 60000,
          gasPrice: '20000000000'
        }
      );
      console.log('result', result);
    },
    async transferTokensWithoutGasClick() {
      const result = await this.contract.transfer(
        '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
        '15000',
        {
          gasPrice: '20000000000'
        }
      );
      console.log('result', result);
    },
    async approveTokensWithoutGasClick() {
      const result = await this.contract.approve(
        '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
        '70000',
        {
          gasPrice: '20000000000'
        }
      );
      console.log('result', result);
    }
  }
});
</script>
