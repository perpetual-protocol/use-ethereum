import { act, renderHook } from "@testing-library/react-hooks"
import { providers } from "ethers"
import { useConnection } from "./connection"
import { ConnectorId } from "./connectors"

const mockWeb3React = {
    activate: jest.fn(),
    deactivate: jest.fn(),
    connector: null,
    library: null,
    account: "fake-account",
}

jest.mock("@web3-react/core", () => {
    return {
        useWeb3React: () => {
            return mockWeb3React
        },
    }
})

describe("connection", () => {
    const network = providers.getNetwork("homestead")

    beforeEach(() => {
        mockWeb3React.activate.mockReset()
        mockWeb3React.deactivate.mockReset()
    })

    it("has default connectorId ethers", () => {
        const { result } = renderHook(() => useConnection(network))
        expect(result.current.connectorId).toEqual(ConnectorId.Ethers)
    })

    it('set connector to "metamask" when executes connect("metamask")', () => {
        const { result } = renderHook(() => useConnection(network))
        act(() => {
            result.current.connect(ConnectorId.Metamask)
        })
        expect(mockWeb3React.activate).toHaveBeenCalled()
        expect(result.current.connectorId).toEqual(ConnectorId.Metamask)
    })

    it("resets connectorId to 'ether' when executes disconnect()", () => {
        const { result } = renderHook(() => useConnection(network))

        act(() => {
            result.current.connect(ConnectorId.Metamask)
        })

        expect(result.current.connectorId).toEqual(ConnectorId.Metamask)

        act(() => {
            result.current.disconnect()
        })
        expect(result.current.connectorId).toEqual(ConnectorId.Ethers)
    })
})
