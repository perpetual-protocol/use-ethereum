import { AbstractConnector } from "@web3-react/abstract-connector"
import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { providers } from "ethers"
import { EthersConnector } from "./connectors/EthersConnector"

export enum ConnectorId {
    Ethers = "Ethers",
    Metamask = "Metamask",
    WalletConnect = "WalletConnect",
}

export interface ConnectorMetadata {
    id: ConnectorId
    name: string
    instance: AbstractConnector
}

type ConnectorMap = Record<ConnectorId, ConnectorMetadata>
type Network = providers.Network
const { InfuraProvider } = providers

export function useConnectors(defaultNetwork: Network, options?: any): Partial<ConnectorMap> {
    const connectors: Partial<ConnectorMap> = {}

    connectors[ConnectorId.Metamask] = {
        id: ConnectorId.Metamask,
        name: "Metamask",
        instance: new InjectedConnector({}),
    }

    connectors[ConnectorId.Ethers] = {
        id: ConnectorId.Ethers,
        name: "Ethers",
        instance: new EthersConnector(defaultNetwork),
    }

    // wallet connect only support chain id <= 1 which means homestead/mainnet
    if (defaultNetwork.chainId <= 1) {
        const infuraOptions = options?.infura || { projectId: "" }
        const { url } = InfuraProvider.getUrl(defaultNetwork, infuraOptions)
        connectors[ConnectorId.WalletConnect] = {
            id: ConnectorId.WalletConnect,
            name: "Wallet Connect",
            instance: new WalletConnectConnector({
                rpc: { [defaultNetwork.chainId]: url },
            }),
        }
    }

    return connectors
}
