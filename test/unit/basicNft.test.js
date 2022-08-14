const { assert } = require("chai");
const { network, ethers, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT", function() {
      let basicNftFactory, basicNft, deployer;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["basicnft"]);
        basicNftFactory = await ethers.getContractFactory("BasicNft");
        basicNft = await basicNftFactory.deploy();
      });

      it("Allows users to mint an NFT, and updates appropriately", async function() {
        const txResponse = await basicNft.mintNft();
        await txResponse.wait(1);
        const tokenURI = await basicNft.tokenURI(0);
        const tokenCounter = await basicNft.getTokenCounter();

        assert.equal(tokenCounter.toString(), "1");
        assert.equal(tokenURI, await basicNft.TOKEN_URI());
      });
    });
