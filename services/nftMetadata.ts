import { Signer } from "ethers";
import axios from 'axios'
import { getErc721Contract } from "./chain/prefabContractFactory";

export class NftMetaDataService {
    constructor(private signer: Signer) {}

    async getMetadataUrl(contractAddress: string, tokenId: string): Promise<[string]> {
        const contract = await getErc721Contract(contractAddress, this.signer);
        const metadata = await contract.functions.tokenURI(tokenId);
        return metadata;
    }

    async getMetadata(contractAddress: string, tokenId: string): Promise<[string]> {
        const metadataUrl = await this.getMetadataUrl(contractAddress, tokenId);
        const metadata = await axios.get(metadataUrl[0]);
        return metadata.data;
    }
}