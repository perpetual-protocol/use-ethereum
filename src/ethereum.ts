import { useContext } from "react"
import { ConnectionHooks, useConnection } from "./connection"
import { EthereumProviderContext, MultiNetworkConfig } from "./provider"

type HookMap = Record<string, ConnectionHooks>

export function getHooks(config: MultiNetworkConfig) {
    const hooks: Record<string, ConnectionHooks> = {}
    Object.entries(config).forEach(([networkName, networkConfig]) => {
        hooks[networkName] = useConnection(networkConfig.network, networkConfig.options)
    })
    return hooks
}

export const useEthereum = (): HookMap => {
    return getHooks(useContext(EthereumProviderContext))
}
