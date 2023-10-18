require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks : {
    goerli : {
      url : 'https://eth-goerli.g.alchemy.com/v2/demo',
      accounts : ['5f99874d16b03f47a9a6044d549948c7b910f5af51c5bfd01fae172cbb940000']
    } 
  }
};