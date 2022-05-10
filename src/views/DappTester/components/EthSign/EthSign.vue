<template>
  <CustomCard title="Eth Sign">
    <v-text-field
      hide-details
      v-model="message"
      variant="outlined"
      label="Message"
    ></v-text-field>
    <CustomBtn @click="onClickSign">Sign</CustomBtn>
    <CustomTextbox title="Result">{{ ethSignResult }}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

const ethereum = window.ethereum;

export default defineComponent({
  name: 'ModuleEthSign',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props: {
    signer: {
      type: Object,
      default: null
    }
  },
  data: () => {
    return {
      message:
        '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0',
      ethSignResult: '',
      account: ''
    };
  },
  methods: {
    async onClickSign() {
      try {
        const ethResult = await ethereum.request({
          method: 'eth_sign',
          params: [this.account, this.message]
        });
        this.ethSignResult = JSON.stringify(ethResult);
      } catch (err) {
        console.error(err);
        this.ethSignResult = `Error: ${err.message}`;
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
