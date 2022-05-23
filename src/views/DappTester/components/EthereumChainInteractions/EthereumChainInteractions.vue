<template>
  <CustomCard title="Ethereum Chain Interactions">
    <CustomBtn :disabled="!props.isConnected" @click="addEthereumChain()"
      >Add xDAI Chain
    </CustomBtn>
    <CustomBtn :disabled="!props.isConnected" @click="switchEthereumChain()"
      >Switch to xDAI Chain
    </CustomBtn>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
const ethereum = window.ethereum;

const props = defineProps({
  isConnected: {
    type: Boolean,
    default: false
  }
});

const addEthereumChain = async () => {
  await ethereum.request({
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
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: '0x64'
      }
    ]
  });
};
</script>
