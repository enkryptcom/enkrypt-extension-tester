<template>
  <CustomCard title="Ethereum Chain Interactions">
    <CustomBtn @click="addEthereumChain()">Add xDAI Chain</CustomBtn>
    <CustomBtn @click="switchEthereumChain()">Switch to xDAI Chain</CustomBtn>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const props = defineProps({
  ethereum: {
    type: Object,
    default: null
  }
});

const addEthereumChain = async () => {
  await props.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x64',
        rpcUrls: ['https://dai.poa.network'],
        chainName: 'xDAI Chain',
        nativeCurrency: { name: 'xDAI', decimals: 18, symbol: 'xDAI' },
        blockExplorerUrls: ['https://blockscout.com/poa/xdai']
      }
    ]
  });
};

const switchEthereumChain = async () => {
  await props.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: '0x64'
      }
    ]
  });
};
</script>
