// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSigner } from '../../../../../../../services/chain/signers'
import { NftMetaDataService } from '../../../../../../../services/nftMetadata'
import { NetworkName } from '../../../../../../../services/settings'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const signer = getAdminSigner(req.query.network as NetworkName)
        const nftMetaDataService = new NftMetaDataService(signer)
        const contractAddress = req.query.address as string
        const tokenId = req.query.id as string
        const { image, contentType} = await nftMetaDataService.getImage(contractAddress, tokenId)
        // Send response as image type
        res.setHeader('Content-Type', contentType).status(200).end(image)
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }
        else {
            res.status(500).json({ error: error })
        }
    }
}
