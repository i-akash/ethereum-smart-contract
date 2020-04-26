pragma solidity ^0.6.0;


contract Parchase {
    enum ParchaseState {OnGoing, Locked, Released, InActive}
    ParchaseState public state;

    address payable public seller;
    address payable public buyer;
    uint256 public value;

    event ParchaseAborted(address seller, uint256 value);
    event ParchaseConfirmed(address buyer, uint256 value);
    event ConfirmedRecieved(address buyer);
    event SellerRefunded(address seller, uint256 value);

    modifier OnlySeller() {
        require(msg.sender == seller, "Only seller is allowed");
        _;
    }

    modifier OnlyBuyer() {
        require(msg.sender == buyer, "Only buyer is allowed");
        _;
    }

    modifier InState(ParchaseState _state) {
        require(state == _state, "State is different");
        _;
    }

    constructor() public payable {
        seller = msg.sender;
        value = msg.value;
    }

    function Abort() public OnlySeller InState(ParchaseState.OnGoing) {
        state = ParchaseState.InActive;
        emit ParchaseAborted(msg.sender, value);
        seller.transfer(address(this).balance);
    }

    function ConfirmParchase() public payable InState(ParchaseState.OnGoing) {
        require(msg.value >= value, "You don't have sufficient balance");
        state = ParchaseState.Locked;
        buyer = msg.sender;
        emit ParchaseConfirmed(buyer, msg.value);
    }

    function ConfirmReceived() public OnlyBuyer {
        state = ParchaseState.Released;
        emit ConfirmedRecieved(buyer);
    }

    function RefundSeller() public OnlySeller InState(ParchaseState.Released) {
        state = ParchaseState.InActive;
        seller.transfer(value);
        emit ParchaseAborted(msg.sender, value);
    }
}
