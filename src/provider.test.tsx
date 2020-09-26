import { act, renderHook } from "@testing-library/react-hooks"
import { providers } from "ethers"
import React from "react"
import { useEthereum } from "./ethereum"
import { EthereumProvider, MultiNetworkConfig } from "./provider"

describe("EthereumProvider", () => {
    it("has default set of hooks", async () => {
        await act(async () => {
            const wrapper = ({ children }: any) => <EthereumProvider>{children}</EthereumProvider>
            const { result, waitForNextUpdate } = renderHook(() => useEthereum(), { wrapper })
            await waitForNextUpdate()
            expect(result.current.homestead).toBeTruthy()
        })
    })

    it("has kovan hooks if change network to kovan", async () => {
        await act(async () => {
            const config: MultiNetworkConfig = {
                kovan: {
                    network: providers.getNetwork("kovan"),
                },
            }
            const wrapper = ({ children }: any) => (
                <EthereumProvider config={config}>{children}</EthereumProvider>
            )
            const { result, waitForNextUpdate } = renderHook(() => useEthereum(), { wrapper })
            await waitForNextUpdate()
            expect(result.current.kovan).toBeTruthy()
        })
    })

    it("has multiple hook set with multi-network config", async () => {
        await act(async () => {
            const config: MultiNetworkConfig = {
                kovan: {
                    network: providers.getNetwork("kovan"),
                },
                rinkeby: {
                    network: providers.getNetwork("rinkeby"),
                },
            }
            const wrapper = ({ children }: any) => (
                <EthereumProvider config={config}>{children}</EthereumProvider>
            )
            const { result, waitForNextUpdate } = renderHook(() => useEthereum(), { wrapper })
            await waitForNextUpdate()
            expect(result.current.kovan).toBeTruthy()
            expect(result.current.rinkeby).toBeTruthy()
            expect(result.current.homestead).toBeFalsy()
        })
    })
})
