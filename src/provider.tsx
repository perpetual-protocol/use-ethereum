import { Web3ReactProvider } from "@web3-react/core"
import { providers } from "ethers"
import React, { createContext, ReactNode } from "react"
import { ErrorBoundary } from "./components/ErrorBoundary"
const { getNetwork } = providers

export interface MultiNetworkConfig {
    [networkName: string]: NetworkConfig
}

export interface NetworkConfig {
    network: providers.Network
    options?: any
    erc20Tokens?: Record<string, string> // symbol -> address
}

interface EthereumProviderArguments {
    config?: MultiNetworkConfig
    children: ReactNode
}

const defaultNetworkName = "homestead"
const defaultConfig: MultiNetworkConfig = {
    [defaultNetworkName]: {
        network: getNetwork(defaultNetworkName),
    },
}

export const EthereumProviderContext = createContext<MultiNetworkConfig>({})

function getLibrary(provider: any) {
    return provider
}

export const EthereumProvider = ({
    config = defaultConfig,
    children,
}: EthereumProviderArguments) => {
    return (
        <ErrorBoundary>
            <Web3ReactProvider getLibrary={getLibrary}>
                <EthereumProviderContext.Provider value={config}>
                    {children}
                </EthereumProviderContext.Provider>
            </Web3ReactProvider>
        </ErrorBoundary>
    )
}
