## Demo Link 

https://maibokkrub.github.io/blockchain-refund/
Current version is not deployed to Rinkedby Testnet. It will require running local node.

To run a local node,
```
cd contracts 
yarn 
yarn hardhat node
yarn deploy scripts/deploy.ts --network localhost
```
Don't for get to change the wallet RPC to local.

## About

This project is created to implement VAT refund process on Blockchain. All stakeholders including Tourist, Shop and Government can participate in the process to reduce time and waste in existing refund process.

## Known Issues

- Pages sometimes crash/load slowly when fecth data (need contract call optimization)

## Frontend

Directory `./ui/app`

Installing dependencies
```
cd ui/app 
yarn
```

Building & Deployment 
```
yarn build 
yarn deploy
```

## Contract

Directory `./contracts`

## Caution

The UI is served by Github Pages from branch `gh-pages`.
Please do not push any code to that branch.


