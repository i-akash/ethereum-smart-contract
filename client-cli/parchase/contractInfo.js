let Web3 = require("web3");
let { parseFileAsJson } = require("../../utils/parse_file");
let { resolveLocation } = require("../../utils/resolve_location");

let web3 = new Web3("http://localhost:8545");

let abi = parseFileAsJson(
  resolveLocation([
    __dirname,
    "../../",
    "build/assets/__smart_contracts_assets_Parchase_sol_Parchase.abi",
  ])
);

let userContractConfig = parseFileAsJson(
  resolveLocation([__dirname, "__parchaseConfig.json"])
);

let contract = new web3.eth.Contract(abi);
contract.options.address = userContractConfig.contractAddress;

function getwinnerName() {
  contract.methods
    .value()
    .call()
    .then((name) => console.log(name))
    .catch((errorRes) => console.log(errorRes.message));
}
getwinnerName();
