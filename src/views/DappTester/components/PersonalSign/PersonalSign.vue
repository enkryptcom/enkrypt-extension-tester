<template>
  <CustomCard title="Personal Sign">
    <CustomBtn>Sign</CustomBtn>
    <CustomTextbox title="Result">null</CustomTextbox>

    <v-divider class="my-12"></v-divider>

    <CustomBtn>Verify</CustomBtn>
    <CustomTextbox title="eth-sig-util recovery result">null</CustomTextbox>
    <CustomTextbox title="personal_ecRecover result">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModulePersonalSign',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
