import { AbstractConnector } from "@web3-react/abstract-connector"
import { ConnectorUpdate } from "@web3-react/types"
import { ethers, providers } from "ethers"

/**
 * Ethers Connector for connecting multiple endpoint
 */
export class EthersConnector extends AbstractConnector {
    private provider: ethers.providers.BaseProvider

    constructor(network: providers.Network) {
        super()
        this.provider = ethers.getDefaultProvider(network)
    }

    async activate(): Promise<ConnectorUpdate> {
        const network = await this.provider.getNetwork()
        return {
            provider: this.provider,
            chainId: network.chainId,
        }
    }

    getProvider(): Promise<providers.BaseProvider> {
        return Promise.resolve(this.provider)
    }

    async getChainId(): Promise<string | number> {
        const network = await this.provider.getNetwork()
        return network.chainId
    }

    getAccount(): Promise<string | null> {
        return Promise.resolve(null)
    }

    deactivate(): void {
        return
    }
}
