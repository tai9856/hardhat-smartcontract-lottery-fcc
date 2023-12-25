const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.parseEther("0.25")
const GAS_PRICE_LINK = 1e9

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network["config"]["chainId"]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")

        const args = [BASE_FEE, GAS_PRICE_LINK]

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network["config"]["blockConfirmations"] || 1,
        })
        log("Mock deployed!")
        log("----------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
