// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {

    uint public counter;

    // 即使不初始化，counter默认也为0
    constructor() {
        counter = 0;
    }

    function count() public {
        counter = counter + 1;
    }

    function add(uint x) public returns(uint) {
        counter = counter + x;
        return counter;
    }

}