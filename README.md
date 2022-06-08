## NFT Metadata Service

This is a web service that will return the metadata and current owner for any NFT whose metadata is accessible via HTTP. Metadata hosted on IPFS is not yet supported.
## Getting Started

### Configuration
Create a `.env` file to the root and add values to it:
```
RPC_URL=URL to Ethereum node
CHAIN_ID=Chain ID for the network
PRIVATE_KEY_MNEMONIC=twelve word mnemonic for your private key which you certainly wrote down
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

## Requesting NFT Metadata

```
curl http://localhost:3000/api/nft/{contract address}/{token ID}
```

The data is returned any metadata serving the URI for the specified token, along with the address of the current token owner, eg:

```
{
    "name":"Grimdog #101",
    "description":"Grimdogs are dogs and they are quite grim.",
    "image":"https://www.grimdogsexample.com/30290ai.png",
    "edition":1,
    "attributes":[
        {"trait_type":"background","value":"leafy"},
        {"trait_type":"body","value":"hairy"},
        {"trait_type":"eyes","value":"bulbous"},
        {"trait_type":"teeth","value":"blunt"},
        {"trait_type":"head","value":"fluffy"}
    ],
    "owner":"0xCF368E3e5842C8B78ff13bF07445da255A124249"
}
```

## Deploying

This project is configured to run on Vercel (https://vercel.com/). Just fork the repo, register it on Vercel, and push to deploy!