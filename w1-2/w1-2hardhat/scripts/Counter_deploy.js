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