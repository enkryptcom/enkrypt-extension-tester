<template>
  <CustomCard title="Personal Sign">
    <v-text-field
      hide-details
      v-model="message"
      variant="outlined"
      label="Message"
    ></v-text-field>

    <CustomBtn @click="onClickSign">Sign</CustomBtn>
    <CustomTextbox title="Result">
      <div>Message: {{ message }}</div>
      <div>Signature: {{ signature }}</div>
    </CustomTextbox>

    <v-divider class="my-12"></v-divider>

    <CustomBtn :disabled="!message || !signature" @click="verify">
      Verify
    </CustomBtn>
    <CustomTextbox title="eth-sig-util recovery result">{{
      address
    }}</CustomTextbox>

    <!--
    <CustomTextbox title="personal_ecRecover result">null</CustomTextbox>
    -->
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'ModulePersonalSign',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props: {
    signer: {
      type: Object,
      default: null
    }
  },
  data: () => {
    return { message: 'Hello signer!', signature: '', address: '' };
  },
  methods: {
    async onClickSign() {
      this.signature = await this.signer.signMessage(this.message);
    },
    verify() {
      this.address = ethers.utils.verifyMessage(this.message, this.signature);
    }
  }
});
</script>
