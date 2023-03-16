// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) public balances; // 记录每个地址的余额
    mapping(uint256 => Transaction) public transactions; // 记录每笔交易

    uint256 public transactionCount = 0; // 交易计数器
    address public owner; // 合约拥有者

    event Deposit(address indexed sender, uint256 amount); // 存款事件
    event Withdrawal(address indexed recipient, uint256 amount); // 取款事件

    struct Transaction {
        address sender;
        uint256 amount;
        uint256 timestamp;
    }

    constructor() {
        owner = msg.sender; // 合约部署者即为合约拥有者
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
        transactionCount++;
        transactions[transactionCount] = Transaction(msg.sender, msg.value, block.timestamp);
        emit Deposit(msg.sender, msg.value);
    }

    function withdrawAll() external {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }
}