<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <basic-actions 
  :ethereum="ethereum"/>
</template>

<script>
import BasicActions from "./components/basic-actions/BasicActions.vue";
import {ethers} from 'ethers';

export default {
  name: "App",
  components: {
    BasicActions,
  },
  data(){
    return{
      ethereum:{},
      ethersProvider: {}
    }
  },
  mounted(){
    this.initialize();
  },
  methods:{
    async initialize() {
      try {
        // We must specify the network as 'any' for ethers to allow network changes
        this.ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        this.ethereum = window.ethereum;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
