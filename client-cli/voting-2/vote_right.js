let Web3 = require('web3')
let fs = require('fs')
let { parseFileAsJson } = require('../../utils/parse_file')
let { resolveLocation } = require("../../utils/resolve_location")

let web3 = new Web3("http://localhost:8545")


let abi = parseFileAsJson(resolveLocation([__dirname, "../../", 'build/voting-2/__smart_contracts_voting-2_Ballot_sol_Ballot.abi']))
let userContractConfig = parseFileAsJson(resolveLocation([__dirname, '__votingConfig.json']))
let contract = new web3.eth.Contract(abi)
contract.options.address = userContractConfig.contractAddress


function giveVoteRight(address) {
    contract.methods.giveRightToVote(address)
        .send({ from: userContractConfig.chairParson })
        .then(responseObj => {
            console.log(responseObj)
            userContractConfig.currentVoter = address
            fs.writeFile(resolveLocation([__dirname, '__votingConfig.json']), JSON.stringify(userContractConfig), () => console.log("Contract Info Updated"))

        })
        .catch(errorRes => console.log(errorRes.message))
}

giveVoteRight("0x34234089F9d943bB3fBA262fF928b437c90398D2")