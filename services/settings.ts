
import "dotenv/config"

export type NetworkConfig = {
    name: NetworkName,
    rpcUrl: string,
}
export type Settings = {
    networks: NetworkConfig[],
    //CHAIN_ID: number;
    mnemonic: string;
}

export enum NetworkName {
    Kovan = "kovan",
    Rinkeby = "rinkeby",
    Mainnet = "mainnet",
    Local = "local"
}

export function getSettings(): Settings {
    const networks: NetworkConfig[] = [];
    Object.values(NetworkName).forEach((name: NetworkName) => {
        const rpcUrl = process.env[`${name.toUpperCase()}_RPC_URL`]
        if (rpcUrl) {
            networks.push({
                name,
                rpcUrl: rpcUrl ?? "http://127.0.0.1:8545",
            });
        }
    });

    return {
        networks,
        mnemonic: process.env["PRIVATE_KEY_MNEMONIC"] ?? ""
    }
}
    