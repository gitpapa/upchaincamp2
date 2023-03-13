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