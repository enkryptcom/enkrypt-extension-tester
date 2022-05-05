<template>
  <CustomCard title="Send form">
    <v-text-field
      v-model="from"
      hide-details
      variant="outlined"
      label="From"
      class="mb-8"
    ></v-text-field>
    <v-text-field
      v-model="to"
      hide-details
      variant="outlined"
      label="To"
      class="mb-8"
    ></v-text-field>
    <v-text-field
      v-model="amount"
      hide-details
      variant="outlined"
      label="Amount"
      class="mb-8"
    ></v-text-field>

    <v-select variant="outlined" label="Type"></v-select>

    <v-text-field
      v-model="gasPrice"
      hide-details
      variant="outlined"
      label="Gas Price"
      class="mb-8"
    ></v-text-field>
    <v-text-field
      v-model="data"
      hide-details
      variant="outlined"
      label="Data"
      class="mb-8"
    ></v-text-field>
    <CustomBtn>Submit</CustomBtn>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModuleSendform',
  components: { CustomCard, CustomBtn },
  data: () => {
    return {
      from: 'null',
      to: 'null',
      amount: 'null',
      gasPrice: 'null',
      data: 'null'
    };
  }
});
</script>
