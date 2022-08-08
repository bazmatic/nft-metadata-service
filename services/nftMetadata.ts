import { Signer } from "ethers";
import axios from 'axios'
import { getErc721Contract } from "./chain/prefabContractFactory";

export class NftMetaDataService {
    constructor(private signer: Signer) {}

    async getMetadataUrl(contractAddress: string, tokenId: string): Promise<[string]> {
        const contract = await getErc721Contract(contractAddress, this.signer)
        const metadata = await contract.functions.tokenURI(tokenId)
        return metadata
    }

    async getOwner(contractAddress: string, tokenId: string): Promise<string> {
        const contract = await getErc721Contract(contractAddress, this.signer)
        const owner = await contract.functions.ownerOf(tokenId)
        return owner[0]
    }

    async getMetadata(contractAddress: string, tokenId: string): Promise<[string]> {
        let [metadataUrl] = await this.getMetadataUrl(contractAddress, tokenId)
        // Extract the protocol
        const [protocol, ref] = metadataUrl.split("://");
        if (protocol === "ipfs") {
            metadataUrl = `https://ipfs.io/ipfs/${ref}`
        }
        const metadata = await axios.get(metadataUrl);
        metadata.data.owner = (await this.getOwner(contractAddress, tokenId))
        metadata.data.timestamp = Date.now()
        return metadata.data
    }
}