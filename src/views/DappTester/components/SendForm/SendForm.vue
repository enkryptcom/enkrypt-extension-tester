<template>
  <CustomCard title="Send form">
    <v-text-field
      :disabled="!isConnected"
      v-if="!isConnected"
      hide-details
      variant="outlined"
      label="From"
      class="mb-8"
    >
    </v-text-field>
    <v-text-field
      v-if="isConnected"
      v-model="from"
      autofocus
      hide-details
      persistent-placeholder
      label="From"
      variant="outlined"
      :value="fromAccount"
      :placeholder="fromAccount"
      class="mb-8"
    >
    </v-text-field>
    <v-text-field
      :disabled="!isConnected"
      v-model="to"
      hide-details
      variant="outlined"
      label="To"
      class="mb-8"
    ></v-text-field>
    <v-text-field
      :disabled="!isConnected"
      v-model="amount"
      hide-details
      variant="outlined"
      label="Amount"
      class="mb-8"
    ></v-text-field>

    <v-select
      :disabled="!isConnected"
      v-model="type"
      :items="['0x0']"
      variant="outlined"
      label="Type"
    >
    </v-select>

    <v-text-field
      :disabled="!isConnected"
      v-model="gasPrice"
      hide-details
      variant="outlined"
      label="Gas Price"
      class="mb-8"
    ></v-text-field>
    <v-text-field
      :disabled="!isConnected"
      hide-details
      variant="outlined"
      label="Data"
      class="mb-8"
    ></v-text-field>
    <CustomBtn :disabled="!isConnected" @click="send()">Submit</CustomBtn>
  </CustomCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
const ethereum = window.ethereum;
const from = ref<string>('');
const to = ref<string>('');
const amount = ref<string>('');
const gasLimit = ref<string>('0x5028');
const gasPrice = ref<string>('');
const type = ref<string>('0x0');

const props = defineProps({
  fromAccount: {
    type: String,
    default: ''
  },
  isConnected: {
    type: Boolean,
    default: false
  }
});

const send = async () => {
  const results = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: props.fromAccount,
        to: to.value,
        value: amount.value,
        gasLimit: gasLimit.value,
        gasPrice: gasPrice.value,
        type: type.value
      }
    ]
  });
  console.log('send results:', results);
};
</script>
