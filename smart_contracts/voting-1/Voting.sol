pragma solidity ^0.6.4;


contract Voting {
    mapping(bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;

    /*constructor will be called once when deployed the contract to the blockchain*/
    constructor(bytes32[] memory candidateNames) public {
        candidateList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Candidate is not valid");
        //return votesReceived[candidate];
        return 1;
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate), "Candidate is not valid");
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
