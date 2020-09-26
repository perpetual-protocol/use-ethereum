import { providers } from "ethers"
import { useConnection } from "./connection"

const { getNetwork } = providers

export const useEthereum = (defaultNetwork = getNetwork("homestead"), options?: any) => {
    const { connect, disconnect, connectorId } = useConnection(defaultNetwork, options)

    return { connect, disconnect, connectorId }
}
