<template>
  <CustomCard title="Basic Actions">
    <div class="font-weight-bold">Network: {{ network }}</div>
    <div class="font-weight-bold">ChainId: {{ chainId }}</div>
    <div class="font-weight-bold">
      Accounts: {{ accounts.length > 0 ? accounts[0] : "" }}
    </div>
    <CustomBtn :disabled="isDisabled" @click="onClickConnect">
      {{ btnText }}
    </CustomBtn>
    <CustomBtn @click="getAccounts"> eth_accounts </CustomBtn>
    <CustomTextbox title="eth_accounts result">{{ accountsResult }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "@/components/CustomCard/CustomCard.vue";
import CustomTextbox from "@/components/CustomTextbox/CustomTextbox.vue";
import CustomBtn from "@/components/CustomBtn/CustomBtn.vue";

const propsVar = defineProps({
  ethereum: {
    type: Object,
    default: null,
  },
  handleEIP1559Support: {
    default: () => ({}),
    type: Function,
  },
});

let accounts = new Array();
let accountsResult = "null";
let currentUrl: URL;
let btnText = "Connect";
let isDisabled = false;
let chainId = "null";
let network = "null";
let ethereum = propsVar.ethereum;

const isMetaMaskConnected = () => {
  return accounts && accounts.length > 0;
};
const forwarderOrigin = () => {
  return currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;
};
const onClickConnect = async () => {
  try {
    const newAccounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    handleNewAccounts(newAccounts);
  } catch (error) {
    console.log(error);
  }
};
const getAccounts = async () => {
  try {
    const _accounts = await ethereum.request({
      method: "eth_accounts",
    });
    accountsResult = _accounts[0] || "Not able to get accounts";
  } catch (err: any) {
    console.log(err);
    accountsResult = `Error: ${err.message}`;
  }
};

const handleNewAccounts = (newAccounts: Array<Object>) => {
  accounts = newAccounts;
  if (isMetaMaskConnected()) {
    //initializeAccountButtons();
  }
  updateButtons();
};

const handleNewChain = (chainID: string) => {
  chainId = chainID;
};

const handleNewNetwork = (networkID: string) => {
  network = parseInt(networkID).toString();
};

const getNetworkAndChainId = async () => {
  try {
    const chain = await ethereum.request({
      method: "eth_chainId",
    });
    handleNewChain(chain);

    const networkId = await ethereum.request({
      method: "net_version",
    });
    handleNewNetwork(networkId);
    /*
        const block = await this.ethereum.request({
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
        });

        this.handleEIP1559Support(block.baseFeePerGas !== undefined);
        */
  } catch (err) {
    console.error(err);
  }
};

const updateButtons = () => {
  if (isMetaMaskConnected()) {
    btnText = "Connected";
    isDisabled = true;
  } else {
    btnText = "Connect";
    isDisabled = false;
  }
};

const initialize = async () => {
  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.autoRefreshOnNetworkChange = false;
  getNetworkAndChainId();

  ethereum.on("chainChanged", (chain: string) => {
    handleNewChain(chain);
    /*
        this.ethereum
          .request({
            method: 'eth_getBlockByNumber',
            params: ['latest', false],
          })
          .then((block) => {
            this.handleEIP1559Support(block.baseFeePerGas !== undefined);
          });
        */
  });
  ethereum.on("chainChanged", handleNewNetwork);
  ethereum.on("accountsChanged", (newAccounts: Array<Object>) => {
    /*
        this.ethereum
          .request({
            method: 'eth_getBlockByNumber',
            params: ['latest', false],
          })
          .then((block) => {
            this.handleEIP1559Support(block.baseFeePerGas !== undefined);

          });
          */
    handleNewAccounts(newAccounts);
  });

  try {
    const newAccounts = await ethereum.request({
      method: "eth_accounts",
    });
    handleNewAccounts(newAccounts);
  } catch (err) {
    console.log("Error on init when getting accounts", err);
  }
};

initialize();
</script>
