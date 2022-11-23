const { ethers } = require('hardhat');
require('dotenv').config({path: ".env"});

async function main(){
    // instantiate a ContractFactory cor the Verify contract
    const verifyContract = await ethers.getContractFactory('Verify');

    // deploy the contract
    const deployedVerifyContract = await verifyContract.deploy();

    await deployedVerifyContract.deployed();

    // print out the contract address of the deployed contract if successfull
    console.log('Verify Contract Address:', deployedVerifyContract.address);

    console.log('Sleeping...');

    //wait for etherscan to notice that the contract has been deployed
    await sleep(20000);

    // verify the contract after deploying it
    await hre.run('verify:verify', {
    address: deployedVerifyContract.address,
    constructorArguments:[],
    });

    function sleep(ms){
        return new Promise((resolve)=> setTimeout(resolve, ms))
    }
}
// finally call the main function and catch error if any
main().then(()=>process.exit(0)).catch((error)=>{
    console.error(error)
    process.exit(1);
})

// 0xeecD4af7Bd3DACD83Ba9287505368987868c664a