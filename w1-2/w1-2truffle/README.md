# w1-2truffle使用
## 1.初始化truffle项目
    truffle init
## 2.创建合约contracts/Counter.sol
    /// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    contract Counter {
        uint public counter;
        // 不初始化，counter默认为0
        constructor(uint x) {
            counter = x;
        }
        function count() public {
            counter = counter + 1;
        }
        function add(uint x) public returns(uint) {
            counter = counter + x;
            return counter;
        }
    }
## 3.编译合约
    truffle compile
## 4.部署合约
### 1.配置网络
编辑truffle-config.js文件，进行本地网络配置
```
development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 7545,            // Standard Ethereum port (default: none)
    network_id: "5777",       // Any network (default: none)
},
```
### 2.编写部署脚本migrations/1_Counter.js
注意命名方式，多个合约部署时，按照序号顺序执行部署。
```
const Counter = artifacts.require("Counter");
module.exports = function (deployer) {
    deployer.deploy(Counter, 2);
};
```
### 3.启动本地网络
启动ganache节点，直接启动的ganache桌面应用

### 4.执行部署合约
    truffle migrate —-network development

### 5.测试
编写测试用例test/counter.js
```
var Counter = artifacts.require("Counter");
contract("Counter", function(accounts) {
    var counterInstance;
    it("Counter", function() {
        return Counter.deployed().then(function (instance){
            counterInstance = instance;
            return counterInstance.count();
        }).then(function() {
            return counterInstance.counter();
        }).then(function(count){
            assert.equal(count, 1)
        });
    });
});
```
执行测试
```
truffle test
```

