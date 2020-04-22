let Web3 = require('web3')
let { parseFileAsJson } = require('../../utils/parse_file')
let { resolveLocation } = require("../../utils/resolve_location")

let web3 = new Web3("http://localhost:8545")


let abi = parseFileAsJson(resolveLocation([__dirname, "../../", 'build/voting-2/__smart_contracts_voting-2_Ballot_sol_Ballot.abi']))
let userContractConfig = parseFileAsJson(resolveLocation([__dirname, '__votingConfig.json']))

let contract = new web3.eth.Contract(abi)
contract.options.address = userContractConfig.contractAddress


contract.methods.vote(2)
    .send({ from: userContractConfig.currentVoter })
    .then(responseObj => console.log(responseObj))
    .catch(errorRes => console.log(errorRes.message))