let Web3 = require('web3')
let fs = require('fs')
let { parseFileAsJson, parseFileAsString } = require('../../utils/parse_file')
let { resolveLocation } = require("../../utils/resolve_location")


let web3 = new Web3("http://localhost:8545")

let bytecode = parseFileAsString(resolveLocation([__dirname, "../../", 'build/voting-2/__smart_contracts_voting-2_Ballot_sol_Ballot.bin']))
let abi = parseFileAsJson(resolveLocation([__dirname, "../../", 'build/voting-2/__smart_contracts_voting-2_Ballot_sol_Ballot.abi']))
let userContractConfig = parseFileAsJson(resolveLocation([__dirname, '__votingConfig.json']))
let proposalNames = userContractConfig.proposalNames
let deployedContract = new web3.eth.Contract(abi)

deployedContract
    .deploy({
        data: bytecode,
        arguments: [proposalNames.map(proposal => web3.utils.asciiToHex(proposal))]
    })
    .send({
        from: userContractConfig.chairParson,
        gas: 1500000,
        gasPrice: web3.utils.toWei('0.00003', 'ether')
    })
    .then(contractInstance => {
        console.log(contractInstance.options.address);
        userContractConfig.contractAddress = contractInstance.options.address
        fs.writeFile(resolveLocation([__dirname, '__votingConfig.json']), JSON.stringify(userContractConfig), () => console.log("Contract Info Updated"))
    })
    .catch(error => console.log(error))

