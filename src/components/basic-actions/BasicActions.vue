<template>
  <section>
    <div class="row d-flex justify-content-center">
      <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
                Basic Actions
            </h4>
            <button 
                class="btn btn-primary btn-lg btn-block mb-3" 
                id="connectButton" 
                :disabled="isDisabled"
                @click="onClickConnect"
            >
                {{btnText}}
            </button>
            <button 
                class="btn btn-primary btn-lg btn-block mb-3" 
                id="getAccounts"
                @click="getAccounts"
            >
                eth_accounts
            </button>
            <p class="info-text alert alert-secondary">
                eth_accounts result: <span id="getAccountsResult">{{ accountsResult }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "BasicActions",
  props: {
    ethereum: Object,
    default: null
  },
  data() {
      return {
          accounts: [],
          accountsResult: '',
          currentUrl: {},
          btnText: 'Connect',
          isDisabled: false
      };
  },
  computed: {
    isMetaMaskConnected() { return this.accounts && this.accounts.length > 0 },
    forwarderOrigin() { return this.currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined; }
  },
  methods: {
    async onClickConnect() {
        try {
            const newAccounts = await this.ethereum.request({
                method: 'eth_requestAccounts',
            });
            this.handleNewAccounts(newAccounts);
        } catch (error) {
            console.log(error);
        }
    },
    async getAccounts() {
      try {
        const _accounts = await this.ethereum.request({
          method: 'eth_accounts',
        });
        this.accountsResult =
          _accounts[0] || 'Not able to get accounts';
      } catch (err) {
        console.log(err);
        this.accountsResult = `Error: ${err.message}`;
      }
    },
    // Move to global helper class?
    handleNewAccounts(newAccounts) {
      this.accounts = newAccounts;
      if (this.isMetaMaskConnected) {
        console.log('connected');
        //initializeAccountButtons();
      }
      this.updateButtons();
    },
    updateButtons() {
      if (this.isMetaMaskConnected) {
        this.btnText = 'Connected';
        this.isDisabled = true;
      } else {
        this.btnText = 'Connect';
        this.isDisabled = false;
      }
    }
  }
};
</script>

<style scoped>
</style>