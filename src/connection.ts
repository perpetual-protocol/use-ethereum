import { useWeb3React } from "@web3-react/core"
import {
    UserRejectedRequestError,
    WalletConnectConnector,
} from "@web3-react/walletconnect-connector"
import { providers } from "ethers"
import { ConnectorId, useConnectors } from "./connectors"
import { useLocalStorage } from "./localstorage"

export interface ConnectionHooks {
    connectorId: ConnectorId
    connect: (connectorId: ConnectorId) => void
    disconnect: () => void
}

export const defaultConnectionHooks: ConnectionHooks = {
    connectorId: ConnectorId.Ethers,
    connect: () => {},
    disconnect: () => {},
}

type Network = providers.Network

export function useConnection(defaultNetwork: Network, options?: any): ConnectionHooks {
    const connectorIdStorageKey = "connector-id"
    const connectors = useConnectors(defaultNetwork, options)

    const { connector, active, error, activate, deactivate } = useWeb3React()
    const [connectorId, setConnectorId] = useLocalStorage(connectorIdStorageKey, ConnectorId.Ethers)

    if (connectorId === ConnectorId.Ethers && !active) {
        activate(connectors[ConnectorId.Ethers]!.instance)
    }

    if (!active && connectorId && !error) {
        connect(connectorId as ConnectorId)
    }

    if (error instanceof UserRejectedRequestError) {
        console.error("WalletConnect reject connection")
        disconnect()
    }

    function connect(newConnectorId: ConnectorId) {
        const connectorMetadata = connectors[newConnectorId]
        if (connectorMetadata) {
            if (connectorId !== newConnectorId) {
                setConnectorId(newConnectorId)
            }
            activate(connectorMetadata.instance)
        }
    }

    function disconnect() {
        setConnectorId(ConnectorId.Ethers)
        deactivate()

        if (connector instanceof WalletConnectConnector) {
            connector.close()
        }
    }

    return {
        connect,
        disconnect,
        connectorId: connectorId as ConnectorId,
    }
}
