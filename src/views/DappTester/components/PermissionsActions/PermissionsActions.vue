<template>
  <CustomCard title="Permissions Actions">
    <CustomBtn>Request Permissions</CustomBtn>
    <CustomBtn>Get Permissions</CustomBtn>
    <CustomTextbox title="Permissions result">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModulePermissionsActions',
  components: { CustomCard, CustomTextbox, CustomBtn }
});
</script>
