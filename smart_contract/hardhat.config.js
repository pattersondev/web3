// https://eth-ropsten.alchemyapi.io/v2/up836tUNYdSLwlc04qE79SiVpIZ_3F6o

require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        ropsten: {
            url: 'https://eth-ropsten.alchemyapi.io/v2/up836tUNYdSLwlc04qE79SiVpIZ_3F6o',
            accounts: ['4d9f003e09db1317b25267b99157970de02ea8b0dc2300cf71fb3b7978c1f760']
        }
    }
}
