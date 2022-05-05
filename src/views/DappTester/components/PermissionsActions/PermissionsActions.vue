<template>
  <CustomCard title="Permissions Actions">
    <CustomBtn @click="requestPermissions">Request Permissions</CustomBtn>
    <CustomBtn @click="getPermissions">Get Permissions</CustomBtn>
    <CustomTextbox title="Permissions result">{{permissionsResult}}</CustomTextbox>
  </CustomCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomCard from '@/components/CustomCard/CustomCard.vue';
import CustomTextbox from '@/components/CustomTextbox/CustomTextbox.vue';
import CustomBtn from '@/components/CustomBtn/CustomBtn.vue';

export default defineComponent({
  name: 'ModulePermissionsActions',
  components: { CustomCard, CustomTextbox, CustomBtn },
  props:{
    ethereum:{
      type: Object,
      default: null
    }
  },
  data(){
    return {
      permissionsResult: ''
    }
  },
  methods:{
    async requestPermissions() {
      try {
        const permissionsArray = await this.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        this.permissionsResult =
          this.getPermissionsDisplayString(permissionsArray);
      } catch (err) {
        console.log(err);
        this.permissionsResult = `Error: ${err.message}`;
      }
    },
    async getPermissions() {
      try {
        const permissionsArray = await this.ethereum.request({
          method: 'wallet_getPermissions',
        });
        this.permissionsResult =
          this.getPermissionsDisplayString(permissionsArray);
      } catch (err) {
        console.log(err);
        this.permissionsResult = `Error: ${err.message}`;
      }
    },
    getPermissionsDisplayString(permissionsArray) {
      if (permissionsArray.length === 0) {
        return 'No permissions found.';
      }
      const permissionNames = permissionsArray.map((perm) => perm.parentCapability);
      return permissionNames
        .reduce((acc, name) => `${acc}${name}, `, '')
        .replace(/, $/u, '');
    }
  }
});
</script>
