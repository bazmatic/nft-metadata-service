import { ethers } from 'ethers'
import { getSettings, NetworkName } from '../settings'

export function getAdminSigner(network: NetworkName): ethers.Signer {
    const settings = getSettings()
    const rpcUrl = settings.networks.find(n => n.name === network)?.rpcUrl
    const signer = ethers.Wallet.fromMnemonic(settings.mnemonic).connect(new ethers.providers.JsonRpcProvider(rpcUrl))
    return signer
}