// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Contract } from '@ethersproject/contracts'

import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminSigner } from '../../../../../services/chain/signers'
import { NftMetaDataService } from '../../../../../services/nftMetadata'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const signer = getAdminSigner();
    const nftMetaDataService = new NftMetaDataService(signer);
    const metadata = await nftMetaDataService.getMetadata(req.query.address as string, req.query.id as string)

    res.status(200).json(metadata)
}
