import { Contract, ContractFactory } from "ethers";
import { Signer } from "ethers";

export async function getContract <T extends Contract>(
    address: string,
    abi: any,
    signer: Signer
): Promise<T> {
    return new Contract(address, abi, signer) as T
}

