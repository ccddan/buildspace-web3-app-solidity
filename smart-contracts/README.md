# Build a Web3 App With Solidity - BuildSpace - Smart Contracts

## Requirements

- NodeJS >= 16.15.0

## Deployment

```bash
$ npm install

$ npx run lint
$ npm run compile

$ npx hardhat node # for local development only
$ npm test

$ npx hardhat run scripts/deploy.ts --network {localhost|goerli}
$ npm run artifacts

$ npx hardhat verify --network {localhost|goerli} {DEPLOYED_CONTRACT_ADDRESS}
```
