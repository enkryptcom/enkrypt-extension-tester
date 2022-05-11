<template>
  <CustomCard title="Permissions Actions">
    <CustomBtn @click="requestPermissions">Request Permissions</CustomBtn>
    <CustomBtn @click="getPermissions">Get Permissions</CustomBtn>
    <CustomTextbox title="Permissions result">{{
      permissionsResult
    }}</CustomTextbox>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';
import { ref } from 'vue';

const ethereum = window.ethereum;
let permissionsResult = ref('');

const requestPermissions = async () => {
  try {
    const permissionsArray = await ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }]
    });
    permissionsResult.value = getPermissionsDisplayString(permissionsArray);
  } catch (err) {
    console.log(err);
    permissionsResult.value = `Error: ${err}`;
  }
};

const getPermissions = async () => {
  try {
    const permissionsArray = await ethereum.request({
      method: 'wallet_getPermissions'
    });
    permissionsResult = getPermissionsDisplayString(permissionsArray);
  } catch (err) {
    console.log(err);
    permissionsResult.value = `Error: ${err}`;
  }
};

const getPermissionsDisplayString = (permissionsArray: Array<any>) => {
  if (permissionsArray.length === 0) {
    return 'No permissions found.';
  }
  const permissionNames = permissionsArray.map(perm => perm.parentCapability);
  console.log(permissionsArray);
  return permissionNames
    .reduce((acc, name) => `${acc}${name}, `, '')
    .replace(/, $/u, '');
};
</script>
