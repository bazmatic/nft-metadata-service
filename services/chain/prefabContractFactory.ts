import { Signer } from "ethers"

import { IERC721Metadata, IERC721Metadata__factory } from "../../types/contracts";

export async function getErc721Contract(address: string, signer: Signer): Promise<IERC721Metadata> {
    return IERC721Metadata__factory.connect(address, signer)
}

