<template>
  <CustomCard title="Collectibles">
    <v-text-field
      hide-details
      v-model="amount"
      variant="outlined"
      label="Amount"
    ></v-text-field>
    <CustomBtn>Deploy</CustomBtn>
    <CustomBtn>Mint</CustomBtn>
    <CustomTextbox title="Collectibles">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleCollectibles',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data: () => {
    return { amount: 1 };
  }
});
</script>
