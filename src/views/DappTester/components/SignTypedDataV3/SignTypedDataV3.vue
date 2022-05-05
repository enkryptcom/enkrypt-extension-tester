<template>
  <CustomCard title="Sign Typed Data V3">
    <CustomBtn>Sign</CustomBtn>
    <CustomTextbox title="Result">null</CustomTextbox>

    <v-divider class="my-12"></v-divider>

    <CustomBtn>Verify</CustomBtn>
    <CustomTextbox title="Recovery result">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleSignTypedDataV3',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
