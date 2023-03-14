# w1-2hardhad使用
## 1.初始化hardhat项目
```
npm init
npm install --save-dev hardhat
npx hardhat
```
如果出现：You need to install these dependencies to run the sample project，根据提示安装
```
npm install --save-dev "hardhat@^2.13.0" "@nomicfoundation/hardhat-toolbox@^2.0.0"
```
## 2.创建合约contracts/Counter.sol
```
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Counter {
    uint public counter;
    address owner;
    constructor(uint x) {
        counter = x;
        owner = msg.sender;
    }
    function count() public {
        // 仅部署者可以调⽤ count()
        require(msg.sender == owner, "invalid call");
        counter = counter + 1;
        console.log("counter is %s", counter);
    }
}
```
## 3.编译合约
在hardhat.config.js中配置编译器版本：
```
module.exports = {
    solidity: "0.8.18",
};
```
打开一个终端，定位置当前项目，编译合约
```
truffle compile
```
## 4.部署合约
### 1.在hardhat.config.js中配置网络
这里配置了三个网络，分别是hardhat(本地)、goerli（goerli测试网）、mumbai(polygon测试网)，本次部署操作使用mumbai网络
```
require("@nomicfoundation/hardhat-toolbox");
let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })
const PRIVATE_KEY1 = process.env.PRIVATEKEY
const mnemonic = process.env.MNEMONIC

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 31337,
      gas: 12000000,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    goerli: {
      url: "https://eth-goerli.api.onfinality.io/public",
      accounts: [PRIVATE_KEY1],
      chainId: 5,
    },
    // polygon
    mumbai: {
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      accounts: {
        mnemonic: mnemonic,
      },
      chainId: 80001,
    },
  },
};
```
安装dotenv
```
npm install --save-dev dotenv
```
新增并配置.env文件
```
PRIVATEKEY=""
MNEMONIC=""
```
### 2.编写部署脚本script/Counter_deploy.js
```
const { ethers } = require("hardhat");
async function main() {
    // await hre.run('compile');
    const Counter = await ethers.getContractFactory("Counter");
    // 初始参数为0
    const counter = await Counter.deploy(0);
    await counter.deployed();
    console.log("Counter deployed to:", counter.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
```
### 3.执行部署合约
    npx hardhat run scripts/Counter_deploy.js --network mumbai

### 4.测试
在test中编写测试脚本Counter_test.js
```
const { expect } = require("chai");
let counter;
describe("Counter", function () {
  async function init() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy(0);
    await counter.deployed();
    console.log("counter:" + counter.address);
  }
  before(async function () {
    await init();
  });
  // 测试部署者可以成功调⽤ count()
  it("owner success", async function () {
    expect(await counter.count());
  });
  // 其他地址调⽤ count() 失败
  it("add fail", async function () {
    // 创建一个随机地址
    const wallet = ethers.Wallet.createRandom();
    // 使用随机地址调用add
    expect(await counter.connect(wallet).count());
  });
});
```
执行测试
```
npx hardhat test test/Counter_test.js
```
### 5、将代码开源到区块链浏览器(代码验证)
https://polygonscan.com/，注册并登录，申请APIKEY  

将key复制到配置文件中，我的写到了env配置文件中。
```
ETHERSCAN_API_KEY=
```
修改hardhat.config.js文件，增加etherScan的配置项
```
const scankey = process.env.ETHERSCAN_API_KEY
etherscan: {
    apiKey: scankey
},
```
执行验证
```
npx hardhat verify 0xdd4d3d9446ccd7b4532fb828a1143a3a011d497d "0" --network mumbai
```