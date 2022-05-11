interface Window {
  ethereum: ethereum;
}

interface ethereum {
  autoRefreshOnNetworkChange: boolean;
  chainId: string;
  enable: function;
  isMetaMask: boolean;
  networkVersion: string;
  request: function;
  selectedAddress: string;
  send: function;
  sendAsync: function;
  on: function;
  _events: any;
  _eventsCount: number;
  _handleAccountsChanged: function;
  _handleChainChanged: function;
  _handleConnect: function;
  _handleDisconnect: function;
  _handleStreamDisconnect: function;
  _handleUnlockStateChanged: function;
  _jsonRpcConnection: any;
  _log: any;
  _maxListeners: number;
  _metamask: any;
  _rpcEngine: any;
  _rpcRequest: function;
  _sendSync: function;
  _sentWarnings: any;
  _state: any;
  _warnOfDeprecation: function;
}

interface PermissionObject {
  id: string;
  parentCapability: string;
  invoker: string;
  caveats: Array<any>;
  date: number;
}
