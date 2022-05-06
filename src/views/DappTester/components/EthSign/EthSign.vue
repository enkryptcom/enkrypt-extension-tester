<template>
  <CustomCard title="Eth Sign">
    <v-text-field
      hide-details
      v-model="message"
      variant="outlined"
      label="Message"
    ></v-text-field>
    <CustomBtn @click="onClickSign">Sign</CustomBtn>
    <CustomTextbox title="Result">{{ signature }}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

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
    return { message: 'Hello signer!', signature: '' };
  },
  methods: {
    async onClickSign() {
      this.signature = await this.signer.signMessage(this.message);
    }
  },
  mounted() {}
});
</script>
