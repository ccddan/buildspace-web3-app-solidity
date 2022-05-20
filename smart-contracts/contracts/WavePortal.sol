// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 private totalWaves;
    mapping(address => uint256) private wavers;

    event NewWave(address indexed from, string message, uint256 timestamp);

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
