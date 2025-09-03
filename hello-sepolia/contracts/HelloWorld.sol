// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWorld {
    string private message;
    event MessageChanged(address indexed sender, string newMessage);

    constructor(string memory _message) {
        message = _message;
        emit MessageChanged(msg.sender, _message);
    }

    function hello() external view returns (string memory) {
        return message;
    }

    function setMessage(string calldata _message) external {
        message = _message;
        emit MessageChanged(msg.sender, _message);
    }
}
