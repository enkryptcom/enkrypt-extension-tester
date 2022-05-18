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
import type { PermissionObject } from './types';
import { ref } from 'vue';

const ethereum = window.ethereum;
const permissionsResult = ref<string>('');

const requestPermissions = async () => {
  try {
    const permissionsArray = await ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }]
    });
    permissionsResult.value = getPermissionsDisplayString(permissionsArray);
  } catch (err) {
    const error = err as Error;
    permissionsResult.value = `Error: ${error.message}`;
  }
};

const getPermissions = async () => {
  try {
    const permissionsArray = await ethereum.request({
      method: 'wallet_getPermissions'
    });
    permissionsResult.value = getPermissionsDisplayString(permissionsArray);
  } catch (err) {
    const error = err as Error;
    permissionsResult.value = `Error: ${error.message}`;
  }
};

const getPermissionsDisplayString = (
  permissionsArray: Array<PermissionObject>
) => {
  if (permissionsArray.length === 0) {
    return 'No permissions found.';
  }
  const permissionNames = permissionsArray.map(perm => perm.parentCapability);
  return permissionNames
    .reduce((acc, name) => `${acc}${name}, `, '')
    .replace(/, $/u, '');
};
</script>
