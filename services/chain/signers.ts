import { ethers } from 'ethers'
import { getSettings } from '../settings'

export function getAdminSigner(): ethers.Signer {
    const settings = getSettings()
    const signer = ethers.Wallet.fromMnemonic(settings.PRIVATE_KEY_MNEMONIC).connect(new ethers.providers.JsonRpcProvider(settings.RPC_URL))
    return signer
}