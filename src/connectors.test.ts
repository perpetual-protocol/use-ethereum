import { renderHook } from "@testing-library/react-hooks"
import { providers } from "ethers"
import { ConnectorId, useConnectors } from "./connectors"

describe("connectors", () => {
    it("returns connectors without WalletConnect for rinkeby", () => {
        const network = providers.getNetwork("rinkeby")
        const { result } = renderHook(() => useConnectors(network))

        expect(Object.keys(result.current)).not.toContain(ConnectorId.WalletConnect)
    })

    it("returns connectors with WalletConnect for mainnet", () => {
        const network = providers.getNetwork("homestead")
        const { result } = renderHook(() => useConnectors(network))

        expect(Object.keys(result.current)).toContain(ConnectorId.WalletConnect)
    })
})
