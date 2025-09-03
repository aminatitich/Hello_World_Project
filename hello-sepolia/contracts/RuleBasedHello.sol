// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RuleBasedHello {
    address public immutable admin;
    string  private message;

    uint256 public constant MIN_PAYMENT = 0.0001 ether;

    event MessageChanged(address indexed sender, uint256 value, string newMessage);

    constructor(string memory _msg) {
        admin = msg.sender;
        message = _msg;
        emit MessageChanged(msg.sender, 0, _msg);
    }

    function hello() external view returns (string memory) {
        return message;
    }

    // Change message subject to 3 constraints
    function setMessage(string calldata _msg) external payable {
        require(msg.sender == admin, "only admin");
        require(msg.value >= MIN_PAYMENT, "pay >= 0.0001 ETH");
        require(block.timestamp % 2 == 0, "must be an even second");
        message = _msg;
        emit MessageChanged(msg.sender, msg.value, _msg);
    }
}
