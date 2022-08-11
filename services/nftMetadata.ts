import { Signer } from "ethers";
import axios from 'axios'
import { getErc721Contract } from "./chain/prefabContractFactory";

export type NftMetadaProperty = {
    name: string,
    value: string
}

export type NftMetadata = {
    properties: NftMetadaProperty[],
    image?: string
    owner?: string,
    timestamp?: number
}

export type NftImage = {
    image: ArrayBuffer,
    contentType: string
}
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

    async getMetadata(contractAddress: string, tokenId: string): Promise<NftMetadata> {
        let [metadataUrl] = await this.getMetadataUrl(contractAddress, tokenId)
        // Extract the protocol
        const [protocol, ref] = metadataUrl.split("://");
        if (protocol === "ipfs") {
            metadataUrl = `https://ipfs.io/ipfs/${ref}`
        }
        const metadata = await axios.get(metadataUrl);
        metadata.data.owner = (await this.getOwner(contractAddress, tokenId))
        metadata.data.timestamp = Date.now()
        return metadata.data as NftMetadata
    }

    async getImage(contractAddress: string, tokenId: string): Promise<NftImage> {
        const metadata = await this.getMetadata(contractAddress, tokenId)
        let imageUrl: string;
        if (metadata.image) {
            imageUrl = metadata.image
        } else {
            const imageProperty = metadata.properties.find(p => p.name === 'image')
            if (imageProperty) {
                imageUrl = imageProperty.value
            } else {
                imageUrl = `https://cdn-icons-png.flaticon.com/512/6229/6229134.png`
            }
        }
        const [protocol, ref] = imageUrl.split("://");
        if (protocol === "ipfs") {
            imageUrl = `https://ipfs.io/ipfs/${ref}`
        }
        // Request image and return buffer
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        // Get ContentType
        const contentType = imageResponse.headers['content-type'];
        return { image: imageResponse.data, contentType }

    }
}