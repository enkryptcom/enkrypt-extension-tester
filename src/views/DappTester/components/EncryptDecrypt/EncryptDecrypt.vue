<template>
  <CustomCard title="Encrypt / Decrypt">
    <CustomBtn>Get Encryption Key</CustomBtn>

    <v-divider class="my-12"></v-divider>

    <v-text-field
      hide-details
      v-model="message"
      variant="outlined"
      label="Message to encrypt"
    ></v-text-field>
    <CustomBtn>Encrypt</CustomBtn>

    <v-divider class="my-12"></v-divider>

    <CustomBtn>Decrypt</CustomBtn>
    <CustomTextbox title="Encryption key">null</CustomTextbox>
    <CustomTextbox title="Ciphertext">null</CustomTextbox>
    <CustomTextbox title="Cleartext">null</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleEncryptDecrypt',
  components: { CustomCard, CustomTextbox, CustomBtn },
  data: () => {
    return { message: 'null' };
  }
});
</script>
