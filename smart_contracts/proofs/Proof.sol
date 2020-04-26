pragma solidity ^0.6.0;


contract Proof {
    enum Operation {Create, Update, Remove}
    struct Change {
        Operation operation;
        bytes32 folder;
        bytes32 filename;
        bytes32 filehash;
    }

    struct Member {
        uint32 numChange;
        bool exist;
        mapping(uint32 => Change) changes;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "You are not owner");
        _;
    }

    modifier OnlyMember() {
        require(members[msg.sender].exist == true, "You are not authorized");
        _;
    }

    address owner;
    mapping(address => Member) members;

    constructor() public {
        owner = msg.sender;
        members[owner] = Member(0, true);
    }

    function authorizeMember(address member)
        public
        OnlyOwner
        returns (bool status)
    {
        require(members[member].exist == false, "Member is already authorized");
        members[member] = Member(0, true);
        status = true;
    }

    function AddChange(
        Operation op,
        bytes32 folder,
        bytes32 filename,
        bytes32 filehash
    ) public OnlyMember returns (bool status) {
        Member storage member = members[msg.sender];
        Change memory change = Change(op, folder, filename, filehash);
        member.changes[member.numChange++] = change;
        status = true;
    }
}
