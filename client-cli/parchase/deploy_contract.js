let Web3 = require("web3");
let fs = require("fs");
let { parseFileAsJson, parseFileAsString } = require("../../utils/parse_file");
let { resolveLocation } = require("../../utils/resolve_location");

let web3 = new Web3("http://localhost:8545");

let bytecode = parseFileAsString(
  resolveLocation([
    __dirname,
    "../../",
    "build/assets/__smart_contracts_assets_Parchase_sol_Parchase.bin",
  ])
);
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
let deployedContract = new web3.eth.Contract(abi);

deployedContract
  .deploy({
    data: bytecode,
  })
  .send({
    from: userContractConfig.seller,
    gas: 1500000,
    value: 1000,
    gasPrice: web3.utils.toWei("0.00003", "ether"),
  })
  .then((contractInstance) => {
    console.log(contractInstance.options.address);
    userContractConfig.contractAddress = contractInstance.options.address;
    fs.writeFile(
      resolveLocation([__dirname, "__parchaseConfig.json"]),
      JSON.stringify(userContractConfig),
      () => console.log("Contract Info Updated")
    );

    console.log(contractInstance);
  })
  .catch((error) => console.log(error));
