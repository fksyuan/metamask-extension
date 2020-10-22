## Samurai使用手册

### 1.简介
Samurai是基于以太坊web钱包Metamask进行fork的，针对alaya网络进行适配性的修改, 以满足基于alaya网络的安全和可用性的需求。用户可以很方便的管理账户并连接到alaya标准测试网络。

### 2.安装

+ 下载[Samurai插件包](https://github.com/fksyuan/metamask-extension/releases/download/alaya-v8.0.10/samurai-chrome-8.0.10.zip)
+ 解压Samurai插件包
```
unzip samurai-chrome-8.0.10.zip -d ${SAMURAIPATH}
```
+ [通过chrome加载已解压的插件包](./add-to-chrome.md)

### 3.使用

#### 3.1 API列表

##### Alaya JSON-RPC API
有关Alaya JSON-RPC API的信息，请参阅[Alaya-devdocs](https://luo-dahui.github.io/alaya-devdocs/zh-CN/Json_Rpc)

比较重要的API方法如下：
+ platon_accounts
+ platon_call
+ platon_getBalance
+ platon_sendTransaction
+ platon_sign

##### 权限相关
+ platon_requestAccounts
+ wallet_requestPermissions
+ wallet_getPermissions

##### 其他RPC API
+ wallet_registerOnboarding
+ wallet_watchAsset

#### 4. Example
下面的例子演示如何在web console端发起普通和合约交易操作，唤起Samurai进行交易处理。

在开启Samurai并已经导入账户后，打开一个新的页面。右击->检查->console进入调试模式(后面的命令行均在console中执行)
##### 4.1 普通交易
+ 请求Samurai用户授权, 运行下面命令会唤起Samurai界面，选择对应的账户同意即可授权页面连接权限
```
> alaya.request({ method: 'platon_requestAccounts' });
Promise {<pending>}
> alaya.selectedAddress
"atp1mm09yjr8vwr2g78gselj03w2eks7atq2jrjlww"
```
+ 发起ATP转账交易, 运行下面的命令会唤起Samurai处理该交易，可以进行再编辑等操作
```
> web3a.platon.sendTransaction({from: alaya.selectedAddress,to: "atp1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gm9mkrr", value: 1e16}, function(err, transactionHash) {if (err) { console.log(err); } else {console.log(transactionHash);}});
```

##### 合约交易
假设你在alaya网络上已经部署好了标准的ERC20代笔合约
+ 如果未请求Samurai账户授权，需要请求Samurai授权，如果已经授权过则略过
```
> alaya.request({ method: 'platon_requestAccounts' });
```
+ 初始化合约对象
```
> var addr = "atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la"
> var abi = [{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getBalanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalSupply","outputs":[{"internalType":"uint256","name":"theTotalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
> var contract = web3a.platon.contract(abi).at(addr)
> contract.getBalanceOf(alaya.selectedAddress, {from: alaya.selectedAddress}, function(err, res) {console.log(res)})
```

+ 发起代币转账, 运行下面的命令会唤起Samurai处理该交易，可以进行再编辑等操作
```
> contract.transfer("atp1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gm9mkrr", 1e13, {from: alaya.selectedAddress}, function(err, res) {console.log(res)})
```
