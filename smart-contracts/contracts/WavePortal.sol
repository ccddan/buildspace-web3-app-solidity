// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 private totalWaves;
    mapping(address => uint256) private wavers;

    event NewWave(address indexed from, string message, uint256 timestamp);
    event EthSent(address indexed waver, uint256 value, uint256 timestamp);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] private waves;

    constructor() payable {
        console.log("Contract initialized");
    }

    function wave(string memory message) public {
        totalWaves += 1;
        wavers[msg.sender] += 1;

        waves.push(Wave(msg.sender, message, block.timestamp));
        emit NewWave(msg.sender, message, block.timestamp);

        console.log("%s has waved!", msg.sender);

        claimEth();
    }

    function claimEth() public {
        console.log("Sending free ETH");

        require(wavers[msg.sender] > 0, "First send wave");
        uint256 prizeAmount = 0.00001 ether;
        require(prizeAmount <= address(this).balance, "Not enough founds");

        (bool success, ) = (payable(address(msg.sender))).call{
            value: prizeAmount
        }("");
        require(success, "Failed to send ETH");

        emit EthSent(msg.sender, prizeAmount, block.timestamp);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves.", totalWaves);
        return totalWaves;
    }

    function getTotalWavesByWaver(address waver) public view returns (uint256) {
        return wavers[waver];
    }

    function getWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
