<template>
  <CustomCard title="Ethereum Chain Interactions">
    <CustomBtn :disabled="!isConnected" @click="addEthereumChain()"
      >Add xDAI Chain
    </CustomBtn>
    <CustomBtn :disabled="!isConnected" @click="switchEthereumChain()"
      >Switch to xDAI Chain
    </CustomBtn>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const props = defineProps({
  ethereum: {
    type: Object,
    default: null
  },
  isConnected: {
    type: Boolean,
    default: false
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
