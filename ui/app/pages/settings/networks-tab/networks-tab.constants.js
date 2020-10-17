const defaultNetworksData = [
  {
    labelKey: 'alaya',
    iconColor: '#F6C343',
    providerType: 'alaya',
    rpcUrl: 'http://192.168.33.203:6789',
    chainId: '201018',
    ticker: 'ATP',
    blockExplorerUrl: 'https://rinkeby.etherscan.io',
  },
  {
    labelKey: 'localhost',
    iconColor: 'white',
    border: '1px solid #6A737D',
    providerType: 'localhost',
    rpcUrl: 'http://localhost:8545/',
    blockExplorerUrl: 'https://etherscan.io',
  },
]

export {
  defaultNetworksData,
}
