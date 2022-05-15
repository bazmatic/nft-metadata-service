
import "dotenv/config"

export type Settings = {
    RPC_URL: string;
    CHAIN_ID: number;
    PRIVATE_KEY_MNEMONIC: string;
}

export function getSettings(): Settings {
    const settings: Settings = {
        RPC_URL: process.env.RPC_URL ?? "",
        CHAIN_ID: Number(process.env.CHAIN_ID ?? 0),
        PRIVATE_KEY_MNEMONIC: process.env.PRIVATE_KEY_MNEMONIC ?? ""
    };
    return settings;
}
